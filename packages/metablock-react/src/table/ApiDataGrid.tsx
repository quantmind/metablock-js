import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import React from "react";
import DataGrid, { Column } from "react-data-grid";
import { useAsync } from "react-use";
import { DataGridApi } from "./loader";
import useStyles from "./style";

interface ApiDataGridProps<DataType, TSummaryRow = unknown> {
  api: DataGridApi<DataType>;
  columns: readonly Column<DataType, TSummaryRow>[];
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
  const extra = { variant: "outlined", size: "small", ...props };
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
    <IconButton aria-label="fullscreen" size="small" {...extra}>
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

const ApiDataGrid = <DataType, TSummaryRow = unknown>(
  props: ApiDataGridProps<DataType, TSummaryRow>
) => {
  const { api, columns, className, search, fullScreen } = props;
  const [ignored, render] = React.useState<any>({});
  const [full, setFullScreen] = React.useState<boolean>(false);
  const [loadingText, setLoading] = React.useState<string>("Loading data...");
  const classes = useStyles();

  const container = clsx({
    [classes.container]: true,
    [classes.fullScreen]: full,
  });

  // do the first loading
  useAsync(async () => {
    await api.loadData();
  }, []);

  const message = (text: string) => {
    setLoading(text);
  };

  const handleFullScreen = () => {
    setFullScreen(!full);
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
    if (text && text.length > 1) {
      message(`Searching for ${text}...`);
      await api.search(text);
      render({});
    }
  };

  const toolbar = [];
  if (search)
    toolbar.push(
      <SearchBox onChange={handleSearch} defaultValue={api.searchText} />
    );
  if (fullScreen)
    toolbar.push(<FullScreen onClick={handleFullScreen} full={full} />);

  return (
    <div className={container}>
      {toolbar.length ? (
        <Box pb={1} className={classes.toolbar}>
          {toolbar}
        </Box>
      ) : null}
      <DataGrid
        columns={columns}
        rows={api.data}
        onRowsChange={render}
        onScroll={handleScroll}
        className={className}
      />
      <Loading text={loadingText} api={api} />
    </div>
  );
};

export default ApiDataGrid;
