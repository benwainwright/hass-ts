/**
 * @public
 *
 * An entry in the Home Assistant logbook
 */
export type LogBookEntry =
  | LogbookStatechangeEntry
  | LogbookStatechangeEntry2
  | LogbookTriggerEntry;

/**
 * @public
 */
export interface LogbookTriggerEntry {
  state: string;
  entity_id: string;
  name: string;
  icon: string;
  when: string;
}

/**
 * @public
 */
export interface LogbookStatechangeEntry {
  state: string;
  entity_id: string;
  name: string;
  when: string;
  context_user_id: string;
  context_domain: string;
  context_service: string;
  context_event_type: string;
}

/**
 * @public
 */
export interface LogbookStatechangeEntry2 {
  state: string;
  entity_id: string;
  name: string;
  when: string;
  context_state: string;
  context_entity_id: string;
  context_entity_id_name: string;
}
