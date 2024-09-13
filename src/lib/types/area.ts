/**
 * An area registered with home assistant
 *
 * @public
 */
export interface HassArea {
  /**
   * Aliases for this area
   */
  aliases: string[];

  /**
   * Unique id that can be used to identify this area
   */
  area_id: string;

  /**
   * What floor is this area on
   */
  floor_id: string | null;

  /**
   * Material icon used to represent this area
   */
  icon: string | null;

  /**
   * List of labels associated with this area
   */
  labels: string[] | null;

  /**
   * Name of the area
   */
  name: string;

  /**
   * URL for the area picture
   */
  picture: string | null;

  /**
   * When was the area created (Unix timestamp in seconds)
   */
  created_at: number;

  /**
   * When was the area modified (Unix timestamp in seconds)
   */
  modified_at: number;
}
