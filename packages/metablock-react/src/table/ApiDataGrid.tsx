import { DataApi } from "@metablock/core";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import DataGrid, { Column } from "react-data-grid";
import { useAsync } from "react-use";
import { ApiDataGridActions, Maybe } from "./types";

interface ApiDataGridProps<DataType, TSummaryRow = unknown> {
  api: DataApi<DataType>;
  columns: readonly Column<DataType, TSummaryRow>[];
  headerRowHeight?: Maybe<number>;
  dataGridCallback?: (actions: ApiDataGridActions) => void;
  title?: string;
  className?: string;
  search?: boolean;
  fullScreen?: boolean;
}

const isAtBottom = ({
  currentTarget,
}: React.UIEvent<HTMLDivElement>): boolean => {
  return (
    currentTarget.scrollTop + 10 >=
    currentTarget.scrollHeight - currentTarget.clientHeight
  );
};

const SearchBox = (props: any) => {
  const extra = {
    variant: "outlined",
    size: "small",
    color: "primary",
    ...props,
  };
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...extra}
    />
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
  const { api, search, fullScreen, dataGridCallback, ...gridProps } = props;
  const [ignored, render] = React.useState<any>({});
  const [full, setFullScreen] = React.useState<boolean>(false);
  const [loadingText, setLoading] = React.useState<string>("Loading data...");
  const [actions, Ignored] = React.useState<ApiDataGridActions>({
    async filter(key: string, value: any) {
      message(`Filtering ${key}=${value}...`);
      await api.filter(key, value);
      render({});
    },
  });

  // do the first loading
  useAsync(async () => {
    await api.loadData();
  }, [api]);

  React.useEffect(() => {
    if (dataGridCallback) dataGridCallback(actions);
  }, [dataGridCallback, actions]);

  // Full screen handling
  let container: Record<string, any> = {
    width: "100%",
    bgcolor: "background.paper",
  };

  if (full)
    container = {
      position: "absolute",
      top: 0,
      bottom: 0,
      height: "100vh",
      zIndex: 99999,
      ...container,
    };

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

  const handleSearch = async (event: React.UIEvent<HTMLInputElement>) => {
    if (api.isDataLoading()) return;
    const text = event.currentTarget.value;
    message(`Searching for ${text}...`);
    await api.search(text);
    render({});
  };

  const toolbar = [];
  if (search)
    toolbar.push(
      <SearchBox onChange={handleSearch} defaultValue={api.searchText} />
    );
  if (fullScreen)
    toolbar.push(<FullScreen onClick={handleFullScreen} full={full} />);

  return (
    <Box sx={container}>
      {toolbar.length ? (
        <Box
          pb={1}
          pt={1}
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
        {...gridProps}
      />
      <Loading text={loadingText} api={api} />
    </Box>
  );
};
