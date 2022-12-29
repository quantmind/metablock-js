export interface CmsListData {
  title: string;
  description: string;
  author: string;
  date: Date | string;
  slug: string;
  image: string;
  urlPath: string;
  index: boolean;
  private: boolean;
}

export interface CmsData extends CmsListData {
  keywords?: string;
  body: string;
  htmlBody: string;
}

export interface CmsListProps {
  data: CmsListData[];
  [x: string]: any;
}
