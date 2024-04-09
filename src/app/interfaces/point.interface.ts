interface IPointCustomer {
  m_points_record_id?: string;
  type_document_id: string;
  firstname: string;
  second_name: string;
  type_document: string;
  lastname: string;
  lastname_mother: string;
  document: string
  birthdate: Date;
  email: string;
  phone: string;
  ubigeo: string
  address: string;
  total_points: number;
}

interface IPoint {
  m_points_record_id?: string;
  type_document_id: string;
  document: string;
  points: number;
}

export { IPointCustomer, IPoint }