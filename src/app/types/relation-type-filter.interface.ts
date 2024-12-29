export interface RelationType {
  // type:any,
  name?: string;
  fields?: object;
  order?: object;
  where?: {
    $a?: {
      neq?: object;
    };
  };
  relations?: RelationType[];
}
