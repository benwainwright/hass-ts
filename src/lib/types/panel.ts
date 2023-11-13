export interface Panel {
  component_name: string;
  icon: null | string;
  title: null | string;
  config: { mode: string } | null;
  url_path: string;
  require_admin: boolean;
  config_panel_domain: null;
}
