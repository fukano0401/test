
import { FxPanelSettingJs } from './models/fx-panel-setting';
import { FxConnectInformationJs } from './models/fx-connect-information';
import { FxDeveloperJs } from './models/fx-developer';
import { FxDashboardJs } from './models/fx-dashboard';
import { AxiosResponse } from 'axios';
import { OpeCombined } from './store/nameident-store';
import { GOptLocDateDataJs } from './opts/base/gbase-loc-date';
import { GOptLastpushDataJs } from './opts/base/gbase-lastpush';
import { GOptBurndownDataJs } from './opts/base/gbase-burndown';
import { GOptUpdaterankingDataJs } from './opts/base/gbase-updateranking';
import { GOptHeatmapDataJs } from './opts/base/gbase-heatmap';
import { GOptBasicstatusDataJs } from './opts/base/gbase-basicstatus';
import { GOptIssuestatusDataJs } from './opts/base/gbase-issuestatus';
import { GOptHigDataJs } from './opts/base/gbase-hig';

export class CommonServerRes {

  public static readonly STATUS_ERROR = 500;

  constructor(
    public status: number,
    public has_app_data: boolean,
    public app_message: string,
    public app_status: string,
    public app_status_code: number,
  ) {
  }

  public isError = (): boolean => {

    if (!this.has_app_data) {
      return true;
    }

    if (this.app_status !== FxApi.ResStatus.SUCCESS) {
      return true;
    }

    return false;
  }

  public someoneChanged = (): boolean => {

    if (
      this.has_app_data &&
      this.app_status === FxApi.ResStatus.ERROR &&
      this.app_status_code === FxApi.ResStatusCode.SOMEONE_CHANGED
    ) {
      return true;
    }

    return false;
  }
}

export namespace FxApi {

  const BASE_API_URL = '/api';

  export namespace ResStatus {
    export const SUCCESS = 'success';
    export const ERROR = 'error';
  }

  export enum ResStatusCode {
    SOMEONE_CHANGED = 409,
  }

  export const parseRes = (response: AxiosResponse<ResFormat<any>>): CommonServerRes => {

    if (!response || !response.status) {
      return new CommonServerRes(
        CommonServerRes.STATUS_ERROR,
        false,
        '',
        '',
        0,
      );
    }


    if (!response.data) {
      return new CommonServerRes(
        response.status,
        false,
        '',
        '',
        0,
      );
    }

    return new CommonServerRes(
      response.status,
      true,
      response.data.message,
      response.data.status,
      response.data.status_code,
    );
  };

  // 戻り値のフォーマット
  export interface ResFormat<T> {
    message: string;
    status: string;
    status_code: number;
    data: T;
  }

  export namespace ToSignin {
    export const url = '/signin';
  }

  export namespace UpdatePanelSettings {
    export const url = BASE_API_URL + '/panel/settings';
    export interface ReqData {
      settings: FxPanelSettingJs[];
      lastupdate: string;
    }
  }

  export namespace UpdateUserSettings {
    export const url = BASE_API_URL + '/user/settings';
    export interface ReqData {
      dashboard_id: number;
      span_id: number;
    }
  }

  export namespace NameidentInit {

    // url
    export const url = BASE_API_URL + '/nameident/init_data';

    // 戻り値のdata部分
    export interface ResData {
      dashboards: FxDashboardJs[];
      connect_informations: FxConnectInformationJs[];
      developers: FxDeveloperJs[];
      lastupdate: string;
    }

    // 戻り値全体
    export interface ResAll extends ResFormat<ResData> {
    }
  }

  export namespace UpdateNameident {

    // url
    export const url = BASE_API_URL + '/nameident/update';

    // 送信data
    export interface ReqData {
      developers: FxDeveloperJs[];
      lastupdate: string;
      opes: OpeCombined[];
    }

    // 戻り値のdata部分
    export interface ResData {
      lastupdate: string;
    }

    // 戻り値全体
    export interface ResAll extends ResFormat<ResData> {
    }
  }

  export namespace GetPanelDataLocDate {

    // url
    export const url = BASE_API_URL + '/panel/loc/date';

    // 戻り値全体
    export interface ResAll extends ResFormat<GOptLocDateDataJs> {
    }
  }

  export namespace GetPanelDataLastpush {

    // url
    export const url = BASE_API_URL + '/panel/lastpush';

    // 戻り値全体
    export interface ResAll extends ResFormat<GOptLastpushDataJs> {
    }
  }

  export namespace GetPanelDataBurndown {

    // url
    export const url = BASE_API_URL + '/panel/burndown';

    // 戻り値全体
    export interface ResAll extends ResFormat<GOptBurndownDataJs> {
    }
  }

  export namespace GetPanelDataUpdateranking {

    // url
    export const url = BASE_API_URL + '/panel/updateranking';

    // 戻り値全体
    export interface ResAll extends ResFormat<GOptUpdaterankingDataJs> {
    }
  }

  export namespace GetPanelDataHeatmap {

    // url
    export const url = BASE_API_URL + '/panel/heatmap';

    // 戻り値全体
    export interface ResAll extends ResFormat<GOptHeatmapDataJs> {
    }
  }

  export namespace GetPanelDataBasicstatus {

    // url
    export const url = BASE_API_URL + '/panel/basicstatus';

    // 戻り値全体
    export interface ResAll extends ResFormat<GOptBasicstatusDataJs> {
    }
  }

  export namespace GetPanelDataIssuestatus {

    // url
    export const url = BASE_API_URL + '/panel/issuestatus';

    // 戻り値全体
    export interface ResAll extends ResFormat<GOptIssuestatusDataJs> {
    }
  }

  export namespace GetPanelDataHig {

    // url
    export const url = BASE_API_URL + '/panel/hig';

    // 戻り値全体
    export interface ResAll extends ResFormat<GOptHigDataJs> {
    }
  }

  export namespace GetPanelProgress {
    // url
    export const url = BASE_API_URL + '/panel/progress';

    // 戻り値のdata部分
    export interface ResData {
      total: number;
      done_count: number;
      dashboard_id: number;
    }

    // 戻り値全体
    export interface ResAll extends ResFormat<ResData> {
    }
  }
}
