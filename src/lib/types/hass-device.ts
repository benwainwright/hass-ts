/**
 * A registered Home Assistant device
 *
 * @alpha
 */
export interface HassDevice {
  area_id: string | null;
  configuration_url: string | null;
  config_entries: string[];
  connections: string[][];
  created_at: number;
  disabled_by: string | null;
  entry_type: string | null;
  hw_version: string | null;
  id: string;
  identifiers: string[][];
  labels: string[];
  manufacturer: string | null;
  model: string | null;
  model_id: string | null;
  modified_at: number;
  name_by_user: null | string;
  name: string;
  primary_config_entry: string | null;

  /**
   * I don't know what the type of this one is as
   * I don't have any devices in my database that aren't null
   */
  serial_number: unknown;
  sw_version: string | null;
  via_device_id: string | null;
}
