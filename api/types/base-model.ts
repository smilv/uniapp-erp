/**
 * @description: 接口返回数据类型
 */

export interface BaseResponse<T = any> {
  header: {
    message: string;
    message_id: any;
    res_code: number;
    resources_id: any;
    time_stamp: string;
    transaction_type: any;
  };
  body: T;
  traceId: string;
}

export interface BasePagination {
  page_index: number;
  page_size: number;
  page_count: number;
}
