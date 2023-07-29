import { DataApi } from "@metablock/core";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import debounce from "lodash.debounce";
import React from "react";
import DataGrid, { Column } from "react-data-grid";
import { useAsync } from "react-use";
import SearchBox from "../Components/SearchBox";
import { DataGridFilters, useDataGridFilters } from "./hooks";
import { ApiDataGridActions, Maybe } from "./types";

interface ApiDataGridProps<DataType, TSummaryRow = unknown> {
  api: DataApi<DataType>;
  columns: readonly Column<DataType, TSummaryRow>[];
  headerRowHeight?: Maybe<number>;
  dataGridCallback?: (actions: ApiDataGridActions) => void;
  dataGridFilters?: DataGridFilters;
  title?: string;
  className?: string;
  resizable?: boolean;
  search?: boolean;
  fullScreen?: boolean;
  searchWait?: number;
  style?: any;
  sx?: any;
  [extra: string]: any;
}

const isAtBottom = ({
  currentTarget,
}: React.UIEvent<HTMLDivElement>): boolean => {
  return (
    currentTarget.scrollTop + 10 >=
    currentTarget.scrollHeight - currentTarget.clientHeight
  );
};

const FullScreen = (props: any) => {
  const { full, ...extra } = props;
  return (
    <IconButton aria-label="fullscreen" size="small" color="primary" {...extra}>
      {full ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
  );
};

const Loading = (props: any) => {
  const { api, text } = props;
  if (!api.isDataLoading()) return null;
  return (
    <Box>
      <Typography component="p">{text}</Typography>
    </Box>
  );
};

export const ApiDataGrid = <DataType, TSummaryRow = unknown>(
  props: ApiDataGridProps<DataType, TSummaryRow>
) => {
  const {
    api,
    search,
    fullScreen,
    sx,
    dataGridFilters,
    searchWait = 500,
    resizable = false,
    fullHeight = false,
    style = {},
    ...gridProps
  } = props;
  const [ignored, render] = React.useState<any>({});
  const [full, setFullScreen] = React.useState<boolean>(false);
  const outerRef = React.useRef<HTMLDivElement>(null);
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const [loadingText, setLoading] = React.useState<string>("Loading data...");
  const defaultDataGridFilters = useDataGridFilters();
  const dgFilters = dataGridFilters || defaultDataGridFilters;
  api.query = dgFilters.filters;

  // do the first loading
  useAsync(async () => {
    api.reset(dgFilters.filters);
    await api.loadData();
  }, [api, dgFilters.filters]);

  React.useEffect(() => {
    let handleResize: any = null;
    if (resizable) {
      handleResize = debounce(() => {
        render({});
      }, 100);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }
    };
  });

  // Full screen handling
  let container: Record<string, any> = {
    width: "100%",
    bgcolor: "background.paper",
    ...sx,
  };

  let gridStyle = style;
  if (style instanceof Function) gridStyle = style(api.data.length);

  if (full)
    container = {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: "100vh",
      zIndex: 99999,
      ...container,
    };
  else if (fullHeight && outerRef.current) {
    container.height = "100%";
    const top = toolbarRef.current ? toolbarRef.current.clientHeight : 0;
    const height = outerRef.current.clientHeight - top;
    gridStyle.height = `${height}px`;
  }

  const handleFullScreen = () => {
    setFullScreen(!full);
  };

  // handle row updates
  const onRowsChange = (rows: DataType[]) => {
    api.data = rows;
    render({});
  };

  const message = (text: string) => {
    setLoading(text);
  };

  const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
    if (!isAtBottom(event)) return;
    if (api.hasMoreData() && !api.isDataLoading()) {
      message("Loading more data...");
      await api.loadData();
      render({});
    }
  };

  const doSearch = debounce((text) => {
    if (api.isDataLoading()) {
      doSearch(text);
      return;
    }
    message(`Searching for ${text}...`);
    api.setSearch(text);
    dgFilters.setAll({ ...api.query });
  }, searchWait);

  const handleSearch = (event: React.UIEvent<HTMLInputElement>) => {
    doSearch(event.currentTarget.value);
  };

  const toolbar = [];
  if (search)
    toolbar.push(
      <SearchBox onChange={handleSearch} defaultValue={api.searchText} />
    );
  if (fullScreen)
    toolbar.push(<FullScreen onClick={handleFullScreen} full={full} />);

  return (
    <Box sx={container} ref={outerRef}>
      {toolbar.length ? (
        <Box
          pb={1}
          pt={1}
          ref={toolbarRef}
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          {toolbar.map((component: any, index: number) => (
            <Box pr={1} key={index}>
              {component}
            </Box>
          ))}
        </Box>
      ) : null}
      <DataGrid
        rows={api.data}
        onRowsChange={onRowsChange}
        onScroll={handleScroll}
        style={gridStyle}
        {...gridProps}
      />
      <Loading text={loadingText} api={api} />
    </Box>
  );
};
