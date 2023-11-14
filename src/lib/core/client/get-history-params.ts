export interface GetHistoryParams {
  timestamp?: Date;
  endTime?: Date;
  filterEntityId: string[];
  minimalResponse?: boolean;
  noAttributes?: boolean;
  significantChangesOnly?: boolean;
}
