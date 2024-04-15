export interface IItem {
  item_id?: string;
  item_category_id: string;
  name: string;
  description: string;
  point_value: number;
  status?: string;
}