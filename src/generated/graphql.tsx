import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Amphures = {
  __typename?: 'Amphures';
  id: Scalars['Float'];
  code: Scalars['String'];
  name_th: Scalars['String'];
  name_en: Scalars['String'];
  province_id: Scalars['Float'];
  province: Provinces;
  districts: Array<Districts>;
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['Float'];
  customerCode: Scalars['String'];
  customerName: Scalars['String'];
  address: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  province: Scalars['String'];
  amphure: Scalars['String'];
  district: Scalars['String'];
  zipCode: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  orderResell: Array<Resell>;
  resellLoaders?: Maybe<Array<Resell>>;
  salesActual: Array<SalesActual>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CustomerJsr = {
  __typename?: 'CustomerJsr';
  id: Scalars['Float'];
  customerCode: Scalars['String'];
  customerPrefix: Scalars['String'];
  customerName: Scalars['String'];
};

export type Customer_Input = {
  customerCode: Scalars['String'];
  customerName: Scalars['String'];
  address: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  province: Scalars['String'];
  amphure: Scalars['String'];
  district: Scalars['String'];
  zipCode: Scalars['Float'];
};

export type Customer_Response = {
  __typename?: 'Customer_Response';
  errors?: Maybe<Array<FieldErrorResell>>;
  customers?: Maybe<Array<Customer>>;
};

export type Districts = {
  __typename?: 'Districts';
  id: Scalars['Float'];
  zip_code: Scalars['Float'];
  name_th: Scalars['String'];
  name_en: Scalars['String'];
  amphure_id: Scalars['Float'];
  amphure: Amphures;
};

export type Factory = {
  __typename?: 'Factory';
  id: Scalars['Float'];
  industrialEstate: Scalars['String'];
  businessType: Scalars['String'];
  companyName: Scalars['String'];
  description: Scalars['String'];
  address: Scalars['String'];
  phoneNumber: Scalars['String'];
  FAX: Scalars['String'];
  Email: Scalars['String'];
  products: Array<ProductByTier>;
  productReceives?: Maybe<Array<ProductByTier>>;
};

export type FactoryInput = {
  industrialEstate: Scalars['String'];
  businessType: Scalars['String'];
  companyName: Scalars['String'];
  description: Scalars['String'];
  address: Scalars['String'];
  phoneNumber: Scalars['String'];
  FAX: Scalars['String'];
  Email: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorGive = {
  __typename?: 'FieldErrorGive';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorJobIt = {
  __typename?: 'FieldErrorJobIT';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorLeave = {
  __typename?: 'FieldErrorLeave';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorManualAd = {
  __typename?: 'FieldErrorManualAD';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorResell = {
  __typename?: 'FieldErrorResell';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorSalesRole = {
  __typename?: 'FieldErrorSalesRole';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorStockIt = {
  __typename?: 'FieldErrorStockIt';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Give = {
  __typename?: 'Give';
  id: Scalars['Float'];
  giveName: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  inventory?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  orders: Array<GiveOrder>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type GiveCatResponse = {
  __typename?: 'GiveCatResponse';
  errors?: Maybe<Array<FieldErrorGive>>;
  giveCat?: Maybe<Array<GiveCategory>>;
};

export type GiveCategory = {
  __typename?: 'GiveCategory';
  id: Scalars['Float'];
  catName: Scalars['String'];
  createdAt: Scalars['String'];
};

export type GiveCdc = {
  __typename?: 'GiveCdc';
  id: Scalars['Float'];
  giveName: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  inventory?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  orders: Array<GiveOrderCdc>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type GiveCdcResponse = {
  __typename?: 'GiveCdcResponse';
  errors?: Maybe<Array<FieldErrorGive>>;
  give?: Maybe<Array<GiveCdc>>;
};

export type GiveInput = {
  giveName: Scalars['String'];
  details: Scalars['String'];
  price: Scalars['Float'];
  inventory: Scalars['Float'];
  category: Scalars['String'];
};

export type GiveOrder = {
  __typename?: 'GiveOrder';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  giveId: Scalars['Float'];
  amount?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  customerId?: Maybe<Scalars['Float']>;
  customerDetail?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  creator: User;
  give: Give;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type GiveOrderCdc = {
  __typename?: 'GiveOrderCdc';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  giveId: Scalars['Float'];
  amount?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  customerId?: Maybe<Scalars['Float']>;
  customerDetail?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  creator: User;
  give: GiveCdc;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type GiveOrderCdcResponse = {
  __typename?: 'GiveOrderCdcResponse';
  errors?: Maybe<Array<FieldErrorGive>>;
  giveOrder?: Maybe<Array<GiveOrderCdc>>;
};

export type GiveOrderResponse = {
  __typename?: 'GiveOrderResponse';
  errors?: Maybe<Array<FieldErrorGive>>;
  giveOrder?: Maybe<Array<GiveOrder>>;
};

export type GiveResponse = {
  __typename?: 'GiveResponse';
  errors?: Maybe<Array<FieldErrorGive>>;
  give?: Maybe<Array<Give>>;
};

export type JobIt = {
  __typename?: 'JobIT';
  id: Scalars['Float'];
  titled: Scalars['String'];
  desiredDate: Scalars['String'];
  category: Scalars['String'];
  status: Scalars['String'];
  itComment?: Maybe<Scalars['String']>;
  itActionName?: Maybe<Scalars['String']>;
  creatorId: Scalars['Float'];
  branch: Scalars['Float'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type JobIt_Input = {
  titled: Scalars['String'];
  desiredDate: Scalars['String'];
  category: Scalars['String'];
};

export type JobIt_Response = {
  __typename?: 'JobIT_Response';
  errors?: Maybe<Array<FieldErrorJobIt>>;
  jobIT?: Maybe<Array<JobIt>>;
};

export type JoinResellInput = {
  resellId: Scalars['Float'];
  customerId: Scalars['Float'];
};

export type JoinTierInput = {
  productId: Scalars['Float'];
  factoryId: Scalars['Float'];
};

export type Leave = {
  __typename?: 'Leave';
  id: Scalars['Float'];
  title: Scalars['String'];
  detail: Scalars['String'];
  sumDate: Scalars['String'];
  sumHour: Scalars['String'];
  dateBegin: Scalars['String'];
  dateEnd: Scalars['String'];
  status: Scalars['String'];
  BossActionName?: Maybe<Scalars['String']>;
  creatorId: Scalars['Float'];
  branch: Scalars['Float'];
  pdfFile?: Maybe<Scalars['String']>;
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Leave_Input = {
  title: Scalars['String'];
  detail: Scalars['String'];
  sumDate: Scalars['String'];
  sumHour: Scalars['String'];
  dateBegin: Scalars['String'];
  dateEnd: Scalars['String'];
};

export type Leave_Response = {
  __typename?: 'Leave_Response';
  errors?: Maybe<Array<FieldErrorLeave>>;
  leave?: Maybe<Array<Leave>>;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type ManualAd = {
  __typename?: 'ManualAD';
  id: Scalars['Float'];
  factoryName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  telephoneNumber?: Maybe<Scalars['String']>;
  manualADUrl: Array<ManualAdUrl>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ManualAdInput = {
  factoryName: Scalars['String'];
  email: Scalars['String'];
  telephoneNumber: Scalars['String'];
};

export type ManualAdResponse = {
  __typename?: 'ManualADResponse';
  errors?: Maybe<Array<FieldErrorManualAd>>;
  manualAD?: Maybe<Array<ManualAd>>;
};

export type ManualAdUrl = {
  __typename?: 'ManualADUrl';
  id: Scalars['Float'];
  manualId: Scalars['Float'];
  title: Scalars['String'];
  url: Scalars['String'];
  manualAD: ManualAd;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  uploadImageMe: UserResponse;
  updateRoles: UserResponse;
  updateUser: UserResponse;
  deleteUser: Scalars['Boolean'];
  createFactory: Factory;
  createProductByTier: ProductByTier;
  joinFactory: Scalars['Boolean'];
  deleteProduct: Scalars['Boolean'];
  createGive: GiveResponse;
  createGiveCdc: GiveCdcResponse;
  updateGive: UpdateGiveResponse;
  updateGiveCdc: UpdateGiveCdcResponse;
  deleteGive: GiveResponse;
  deleteGiveCdc: GiveCdcResponse;
  createGiveOrder: GiveOrderResponse;
  createGiveOrderCdc: GiveOrderCdcResponse;
  updateGiveOrder: UpdateGiveOrderResponse;
  updateGiveOrderCdc: UpdateGiveOrderCdcResponse;
  deleteGiveOrder: Scalars['Boolean'];
  deleteGiveOrderCdc: Scalars['Boolean'];
  createGiveCat: GiveCatResponse;
  deleteGiveCat: Scalars['Boolean'];
  createManualAD: ManualAdResponse;
  uploadPDFAd: ManualAdUrl;
  deleteManualAD: ManualAdResponse;
  createJobIT: JobIt_Response;
  updateJobIT: JobIt;
  jobITComment: JobIt;
  createStockIt: StockItResponse;
  updateStockIt: UpdateStockItResponse;
  deleteStockIt: Scalars['Boolean'];
  createStockItOrder: StockItOrderResponse;
  updateStockItOr: UpdateStockItOrResponse;
  deleteStockItOrder: Scalars['Boolean'];
  createLeave: Leave_Response;
  updateLeave: Leave;
  createResell: Resell_Response;
  createCustomer: Customer_Response;
  joinResell: Resell;
  deleteResell: Scalars['Boolean'];
  deleteJoinResell: Resell;
  createSalesRole: SalesRole_Response;
  createSalesActual: SalesActual_Response;
  deleteSalesActual: Scalars['Boolean'];
  deleteSalesRole: Scalars['Boolean'];
  createSalesTarget: SalesTarget_Response;
  createSalesIssue: SalesIssue_Response;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationUploadImageMeArgs = {
  options: Scalars['Upload'];
};


export type MutationUpdateRolesArgs = {
  id: Scalars['Int'];
  newBranch: Scalars['String'];
  newPosition: Scalars['String'];
  newRoles: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  options: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationCreateFactoryArgs = {
  input: FactoryInput;
};


export type MutationCreateProductByTierArgs = {
  input: ProductByTierInput;
};


export type MutationJoinFactoryArgs = {
  input: JoinTierInput;
};


export type MutationDeleteProductArgs = {
  productId: Scalars['Int'];
};


export type MutationCreateGiveArgs = {
  options: Scalars['Upload'];
  input: GiveInput;
};


export type MutationCreateGiveCdcArgs = {
  options: Scalars['Upload'];
  input: GiveInput;
};


export type MutationUpdateGiveArgs = {
  input: GiveInput;
  id: Scalars['Int'];
};


export type MutationUpdateGiveCdcArgs = {
  input: GiveInput;
  id: Scalars['Int'];
};


export type MutationDeleteGiveArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteGiveCdcArgs = {
  id: Scalars['Int'];
};


export type MutationCreateGiveOrderArgs = {
  input: GiveOrderInput;
};


export type MutationCreateGiveOrderCdcArgs = {
  input: GiveOrderInput;
};


export type MutationUpdateGiveOrderArgs = {
  newStatus: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationUpdateGiveOrderCdcArgs = {
  newStatus: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteGiveOrderArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteGiveOrderCdcArgs = {
  id: Scalars['Int'];
};


export type MutationCreateGiveCatArgs = {
  catName: Scalars['String'];
};


export type MutationDeleteGiveCatArgs = {
  id: Scalars['Int'];
};


export type MutationCreateManualAdArgs = {
  input: ManualAdInput;
};


export type MutationUploadPdfAdArgs = {
  options: Scalars['Upload'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteManualAdArgs = {
  id: Scalars['Int'];
};


export type MutationCreateJobItArgs = {
  input: JobIt_Input;
};


export type MutationUpdateJobItArgs = {
  newStatus: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationJobItCommentArgs = {
  input: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationCreateStockItArgs = {
  options: Scalars['Upload'];
  input: StockItInput;
};


export type MutationUpdateStockItArgs = {
  input: StockItInput;
  id: Scalars['Int'];
};


export type MutationDeleteStockItArgs = {
  id: Scalars['Int'];
};


export type MutationCreateStockItOrderArgs = {
  input: StockItOrderInput;
};


export type MutationUpdateStockItOrArgs = {
  newStatus: Scalars['String'];
  holdStatus: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteStockItOrderArgs = {
  id: Scalars['Int'];
};


export type MutationCreateLeaveArgs = {
  input: Leave_Input;
};


export type MutationUpdateLeaveArgs = {
  newStatus: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationCreateResellArgs = {
  input: Resell_Input;
};


export type MutationCreateCustomerArgs = {
  input: Customer_Input;
};


export type MutationJoinResellArgs = {
  input: JoinResellInput;
};


export type MutationDeleteResellArgs = {
  resellId: Scalars['Int'];
};


export type MutationDeleteJoinResellArgs = {
  input: JoinResellInput;
};


export type MutationCreateSalesRoleArgs = {
  input: SalesRole_Input;
};


export type MutationCreateSalesActualArgs = {
  input: SalesActual_Input;
};


export type MutationDeleteSalesActualArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSalesRoleArgs = {
  id: Scalars['Int'];
};


export type MutationCreateSalesTargetArgs = {
  input: SalesTarget_Input;
};


export type MutationCreateSalesIssueArgs = {
  input: SalesIssue_Input;
};

export type ProductByTier = {
  __typename?: 'ProductByTier';
  id: Scalars['Float'];
  productName: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  creatorName: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: Factory;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  factorys?: Maybe<Array<Factory>>;
};

export type ProductByTierInput = {
  productName: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  creatorName: Scalars['String'];
  creatorId: Scalars['Float'];
};

export type Provinces = {
  __typename?: 'Provinces';
  id: Scalars['Float'];
  code: Scalars['String'];
  name_th: Scalars['String'];
  name_en: Scalars['String'];
  geography_id: Scalars['Float'];
  amphures: Array<Amphures>;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  userById: User;
  userAdmin: Array<User>;
  me?: Maybe<User>;
  factories: Array<Factory>;
  factoryById?: Maybe<Factory>;
  industrialEstate?: Maybe<Array<Factory>>;
  businessType?: Maybe<Array<Factory>>;
  companyName?: Maybe<Factory>;
  ProductByTiers: Array<Maybe<ProductByTier>>;
  gives?: Maybe<Array<Give>>;
  givesCdc?: Maybe<Array<GiveCdc>>;
  giveById: Give;
  giveByIdCdc: GiveCdc;
  giveOrders?: Maybe<Array<GiveOrder>>;
  giveOrdersCdc?: Maybe<Array<GiveOrderCdc>>;
  giveOrderById: GiveOrder;
  giveOrderByIdCdc: GiveOrderCdc;
  giveOrderByCreatorId?: Maybe<Array<GiveOrder>>;
  giveOrderByCreatorIdCdc?: Maybe<Array<GiveOrderCdc>>;
  giveCategories?: Maybe<Array<GiveCategory>>;
  manualADs: Array<ManualAd>;
  manualADById: ManualAd;
  jobITs?: Maybe<Array<JobIt>>;
  jobITById: JobIt;
  jobITByCreatorId?: Maybe<Array<JobIt>>;
  stockIts?: Maybe<Array<StockIt>>;
  stockItById: StockIt;
  stockItOrders?: Maybe<Array<StockItOrder>>;
  stockItOrderById: StockItOrder;
  queryProvinces: Array<Provinces>;
  amphuresPvId: Array<Amphures>;
  districtsApId: Array<Districts>;
  leaves?: Maybe<Array<Leave>>;
  leaveById: Leave;
  resells?: Maybe<Array<Resell>>;
  resellById: Resell;
  resellsByCreator?: Maybe<Array<Resell>>;
  customers?: Maybe<Array<Customer>>;
  customerById: Customer;
  salesRoles?: Maybe<Array<SalesRole>>;
  salesRoleById: SalesRole;
  salesActuals?: Maybe<Array<SalesActual>>;
  targetByRoleId?: Maybe<Array<SalesTarget>>;
  issueByRoleId?: Maybe<Array<SalesIssue>>;
  issueById?: Maybe<SalesIssue>;
  salesBrands?: Maybe<Array<SalesBrand>>;
  customerJsr?: Maybe<Array<CustomerJsr>>;
};


export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryFactoryByIdArgs = {
  id: Scalars['Int'];
};


export type QueryIndustrialEstateArgs = {
  industrialEstate: Scalars['String'];
};


export type QueryBusinessTypeArgs = {
  businessType: Scalars['String'];
};


export type QueryCompanyNameArgs = {
  companyName: Scalars['String'];
};


export type QueryGiveByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGiveByIdCdcArgs = {
  id: Scalars['Int'];
};


export type QueryGiveOrderByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGiveOrderByIdCdcArgs = {
  id: Scalars['Int'];
};


export type QueryManualAdByIdArgs = {
  id: Scalars['Int'];
};


export type QueryJobITsArgs = {
  input: QueryJobIt_Input;
};


export type QueryJobItByIdArgs = {
  id: Scalars['Int'];
};


export type QueryStockItByIdArgs = {
  id: Scalars['Int'];
};


export type QueryStockItOrdersArgs = {
  createBy: Scalars['Boolean'];
};


export type QueryStockItOrderByIdArgs = {
  id: Scalars['Int'];
};


export type QueryAmphuresPvIdArgs = {
  id: Scalars['Int'];
};


export type QueryDistrictsApIdArgs = {
  id: Scalars['Int'];
};


export type QueryLeavesArgs = {
  createBy: Scalars['Boolean'];
};


export type QueryLeaveByIdArgs = {
  id: Scalars['Int'];
};


export type QueryResellByIdArgs = {
  id: Scalars['Int'];
};


export type QueryCustomerByIdArgs = {
  id: Scalars['Int'];
};


export type QuerySalesRoleByIdArgs = {
  monthIndex: Scalars['Int'];
  id: Scalars['Int'];
};


export type QueryTargetByRoleIdArgs = {
  salesRoleId: Scalars['Int'];
};


export type QueryIssueByRoleIdArgs = {
  saleRoleId: Scalars['Int'];
};


export type QueryIssueByIdArgs = {
  id: Scalars['Int'];
};

export type QueryJobIt_Input = {
  nameItAction?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  dateBegin?: Maybe<Scalars['String']>;
  dateEnd?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  roles: Scalars['String'];
  departments: Scalars['String'];
};

export type Resell = {
  __typename?: 'Resell';
  id: Scalars['Float'];
  orderId: Scalars['Float'];
  maker: Scalars['String'];
  title: Scalars['String'];
  detail: Scalars['String'];
  category: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  orderCustomer: Customer;
  customers?: Maybe<Array<Customer>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Resell_Input = {
  orderId: Scalars['Float'];
  maker: Scalars['String'];
  title: Scalars['String'];
  detail: Scalars['String'];
  category: Scalars['String'];
};

export type Resell_Response = {
  __typename?: 'Resell_Response';
  errors?: Maybe<Array<FieldErrorResell>>;
  resells?: Maybe<Array<Resell>>;
};

export type SalesActual = {
  __typename?: 'SalesActual';
  id: Scalars['Float'];
  title: Scalars['String'];
  detail: Scalars['String'];
  actual: Scalars['Float'];
  branch: Scalars['String'];
  customerId: Scalars['Float'];
  userId: Scalars['Float'];
  salesRoleId: Scalars['Float'];
  customer: Customer;
  user: User;
  salesRole: SalesRole;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SalesActual_Input = {
  title: Scalars['String'];
  detail: Scalars['String'];
  actual: Scalars['Float'];
  branch: Scalars['String'];
  customerId: Scalars['Float'];
  userId: Scalars['Float'];
  salesRoleId: Scalars['Float'];
};

export type SalesActual_Response = {
  __typename?: 'SalesActual_Response';
  errors?: Maybe<Array<FieldErrorSalesRole>>;
  salesActual?: Maybe<Array<SalesActual>>;
};

export type SalesBrand = {
  __typename?: 'SalesBrand';
  id: Scalars['Float'];
  brand: Scalars['String'];
};

export type SalesIssue = {
  __typename?: 'SalesIssue';
  id: Scalars['Float'];
  saleRoleId: Scalars['Float'];
  saleName: Scalars['String'];
  contact: Scalars['String'];
  customer: Scalars['String'];
  quotationNo: Scalars['String'];
  brand: Scalars['String'];
  category: Scalars['String'];
  detail: Scalars['String'];
  prob: Scalars['String'];
  status: Scalars['String'];
  value: Scalars['Float'];
  branch: Scalars['String'];
  saleRole: SalesRole;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SalesIssue_Input = {
  customer: Scalars['String'];
  quotationNo: Scalars['String'];
  brand: Scalars['String'];
  category: Scalars['String'];
  detail: Scalars['String'];
  prob: Scalars['String'];
  status: Scalars['String'];
  value: Scalars['Float'];
  contact: Scalars['String'];
};

export type SalesIssue_Response = {
  __typename?: 'SalesIssue_Response';
  errors?: Maybe<Array<FieldErrorSalesRole>>;
  salesIssues?: Maybe<Array<SalesIssue>>;
};

export type SalesRole = {
  __typename?: 'SalesRole';
  id: Scalars['Float'];
  salesRole: Scalars['String'];
  channel: Scalars['String'];
  areaCode: Scalars['String'];
  branch: Scalars['String'];
  status: Scalars['String'];
  userId: Scalars['Float'];
  user: User;
  salesActual: Array<SalesActual>;
  targets: Array<SalesTarget>;
  issues: Array<SalesIssue>;
};

export type SalesRole_Input = {
  salesRole: Scalars['String'];
  channel: Scalars['String'];
  areaCode: Scalars['String'];
  branch: Scalars['String'];
  status: Scalars['String'];
  userId: Scalars['Float'];
};

export type SalesRole_Response = {
  __typename?: 'SalesRole_Response';
  errors?: Maybe<Array<FieldErrorSalesRole>>;
  salesRoles?: Maybe<Array<SalesRole>>;
};

export type SalesTarget = {
  __typename?: 'SalesTarget';
  id: Scalars['Float'];
  year: Scalars['Float'];
  value: Scalars['Float'];
  branch: Scalars['String'];
  salesRoleId: Scalars['Float'];
  sale: SalesRole;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SalesTarget_Input = {
  year: Scalars['Float'];
  value: Scalars['Float'];
  branch: Scalars['String'];
  salesRoleId: Scalars['Float'];
};

export type SalesTarget_Response = {
  __typename?: 'SalesTarget_Response';
  errors?: Maybe<Array<FieldErrorSalesRole>>;
  salesTargets?: Maybe<Array<SalesTarget>>;
};

export type StockIt = {
  __typename?: 'StockIt';
  id: Scalars['Float'];
  itemName: Scalars['String'];
  detail: Scalars['String'];
  location: Scalars['String'];
  serialNum: Scalars['String'];
  warranty: Scalars['String'];
  price: Scalars['Float'];
  currentStatus: Scalars['String'];
  branch: Scalars['String'];
  brand: Scalars['String'];
  category: Scalars['String'];
  orders: Array<StockItOrder>;
  imageUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type StockItInput = {
  itemName: Scalars['String'];
  detail: Scalars['String'];
  location: Scalars['String'];
  serialNum: Scalars['String'];
  warranty: Scalars['String'];
  price: Scalars['Float'];
  branch: Scalars['String'];
  brand: Scalars['String'];
  category: Scalars['String'];
  currentStatus: Scalars['String'];
};

export type StockItOrder = {
  __typename?: 'StockItOrder';
  id: Scalars['Float'];
  detail?: Maybe<Scalars['String']>;
  branch: Scalars['String'];
  creatorId: Scalars['Float'];
  stockItId: Scalars['Float'];
  holdStatus: Scalars['String'];
  status: Scalars['String'];
  creator: User;
  stockIt: StockIt;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type StockItOrderInput = {
  detail?: Maybe<Scalars['String']>;
  stockItId: Scalars['Float'];
  holdStatus: Scalars['String'];
};

export type StockItOrderResponse = {
  __typename?: 'StockItOrderResponse';
  errors?: Maybe<Array<FieldErrorStockIt>>;
  stockItOrder?: Maybe<Array<StockItOrder>>;
};

export type StockItResponse = {
  __typename?: 'StockItResponse';
  errors?: Maybe<Array<FieldErrorStockIt>>;
  stockIt?: Maybe<Array<StockIt>>;
};

export type UpdateGiveCdcResponse = {
  __typename?: 'UpdateGiveCdcResponse';
  errors?: Maybe<Array<FieldErrorGive>>;
  give?: Maybe<GiveCdc>;
};

export type UpdateGiveOrderCdcResponse = {
  __typename?: 'UpdateGiveOrderCdcResponse';
  errors?: Maybe<Array<FieldErrorGive>>;
  giveOrder?: Maybe<GiveOrderCdc>;
};

export type UpdateGiveOrderResponse = {
  __typename?: 'UpdateGiveOrderResponse';
  errors?: Maybe<Array<FieldErrorGive>>;
  giveOrder?: Maybe<GiveOrder>;
};

export type UpdateGiveResponse = {
  __typename?: 'UpdateGiveResponse';
  errors?: Maybe<Array<FieldErrorGive>>;
  give?: Maybe<Give>;
};

export type UpdateStockItOrResponse = {
  __typename?: 'UpdateStockItOrResponse';
  errors?: Maybe<Array<FieldErrorStockIt>>;
  stockItOrder?: Maybe<StockItOrder>;
};

export type UpdateStockItResponse = {
  __typename?: 'UpdateStockItResponse';
  errors?: Maybe<Array<FieldErrorStockIt>>;
  stockIt?: Maybe<StockIt>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  roles: Scalars['String'];
  position: Scalars['String'];
  branch: Scalars['Float'];
  fullNameTH?: Maybe<Scalars['String']>;
  fullNameEN?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  departments: Scalars['String'];
  giveOrders: Array<GiveOrder>;
  giveOrdersCdc: Array<GiveOrderCdc>;
  jobITs: Array<JobIt>;
  stockItOrders: Array<StockItOrder>;
  leaves: Array<Leave>;
  resell: Array<Resell>;
  customer: Array<Customer>;
  salesRole: SalesRole;
  salesActual: Array<SalesActual>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type GiveOrderInput = {
  giveId: Scalars['Float'];
  amount: Scalars['Float'];
  customerId?: Maybe<Scalars['Float']>;
  customerDetail?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  fullNameTH: Scalars['String'];
  fullNameEN: Scalars['String'];
  nickName: Scalars['String'];
  email: Scalars['String'];
};

export type RegularCustomerFragment = (
  { __typename?: 'Customer' }
  & Pick<Customer, 'id' | 'customerCode' | 'customerName' | 'phone' | 'email' | 'province' | 'amphure' | 'district' | 'zipCode' | 'creatorId' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), orderResell: Array<(
    { __typename?: 'Resell' }
    & Pick<Resell, 'id' | 'maker' | 'title'>
  )> }
);

export type RegularGiveFragment = (
  { __typename?: 'Give' }
  & Pick<Give, 'id' | 'giveName' | 'details' | 'price' | 'inventory' | 'category' | 'imageUrl' | 'createdAt' | 'updatedAt'>
);

export type RegularGiveCatFragment = (
  { __typename?: 'GiveCategory' }
  & Pick<GiveCategory, 'id' | 'catName'>
);

export type RegularGiveCdcFragment = (
  { __typename?: 'GiveCdc' }
  & Pick<GiveCdc, 'id' | 'giveName' | 'details' | 'price' | 'inventory' | 'category' | 'imageUrl' | 'createdAt' | 'updatedAt'>
);

export type RegularGiveOrdersFragment = (
  { __typename?: 'GiveOrder' }
  & Pick<GiveOrder, 'id' | 'creatorId' | 'giveId' | 'amount' | 'price' | 'customerId' | 'customerDetail' | 'status' | 'createdAt' | 'updatedAt'>
  & { give: (
    { __typename?: 'Give' }
    & RegularGiveFragment
  ), creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'roles' | 'departments' | 'fullNameTH'>
  ) }
);

export type RegularGiveOrdersCdcFragment = (
  { __typename?: 'GiveOrderCdc' }
  & Pick<GiveOrderCdc, 'id' | 'creatorId' | 'giveId' | 'amount' | 'price' | 'customerId' | 'customerDetail' | 'status' | 'createdAt' | 'updatedAt'>
  & { give: (
    { __typename?: 'GiveCdc' }
    & RegularGiveCdcFragment
  ), creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'roles' | 'departments' | 'fullNameTH'>
  ) }
);

export type RegularJobItFragment = (
  { __typename?: 'JobIT' }
  & Pick<JobIt, 'id' | 'titled' | 'desiredDate' | 'category' | 'status' | 'itComment' | 'itActionName' | 'branch' | 'creatorId' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'roles' | 'departments' | 'fullNameTH'>
  ) }
);

export type RegularLeaveFragment = (
  { __typename?: 'Leave' }
  & Pick<Leave, 'id' | 'title' | 'detail' | 'sumDate' | 'sumHour' | 'dateBegin' | 'dateEnd' | 'status' | 'BossActionName' | 'creatorId' | 'branch' | 'pdfFile' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'fullNameTH' | 'departments' | 'position' | 'imageUrl'>
  ) }
);

export type RegularManualAdFragment = (
  { __typename?: 'ManualAD' }
  & Pick<ManualAd, 'id' | 'factoryName' | 'email' | 'telephoneNumber' | 'createdAt' | 'updatedAt'>
  & { manualADUrl: Array<(
    { __typename?: 'ManualADUrl' }
    & Pick<ManualAdUrl, 'id' | 'manualId' | 'title' | 'url' | 'createdAt' | 'updatedAt'>
  )> }
);

export type RegularResellFragment = (
  { __typename?: 'Resell' }
  & Pick<Resell, 'id' | 'orderId' | 'maker' | 'title' | 'detail' | 'category' | 'creatorId' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'fullNameTH'>
  ), orderCustomer: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'customerCode' | 'customerName'>
  ), customers?: Maybe<Array<(
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'customerCode' | 'customerName'>
  )>> }
);

export type RegularSalesIssueFragment = (
  { __typename?: 'SalesIssue' }
  & Pick<SalesIssue, 'id' | 'saleRoleId' | 'saleName' | 'contact' | 'customer' | 'quotationNo' | 'category' | 'detail' | 'prob' | 'status' | 'value' | 'branch' | 'createdAt' | 'updatedAt' | 'brand'>
  & { saleRole: (
    { __typename?: 'SalesRole' }
    & Pick<SalesRole, 'id' | 'salesRole' | 'channel'>
  ) }
);

export type RegularSalesRoleFragment = (
  { __typename?: 'SalesRole' }
  & Pick<SalesRole, 'id' | 'salesRole' | 'channel' | 'userId' | 'branch' | 'status'>
);

export type RegularStockItFragment = (
  { __typename?: 'StockIt' }
  & Pick<StockIt, 'id' | 'itemName' | 'detail' | 'location' | 'serialNum' | 'warranty' | 'price' | 'currentStatus' | 'branch' | 'brand' | 'category' | 'imageUrl' | 'createdAt' | 'updatedAt'>
  & { orders: Array<(
    { __typename?: 'StockItOrder' }
    & Pick<StockItOrder, 'id' | 'holdStatus' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullNameTH'>
    ) }
  )> }
);

export type RegularStockItOrderFragment = (
  { __typename?: 'StockItOrder' }
  & Pick<StockItOrder, 'id' | 'detail' | 'branch' | 'creatorId' | 'stockItId' | 'holdStatus' | 'status' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'fullNameTH' | 'roles'>
  ), stockIt: (
    { __typename?: 'StockIt' }
    & Pick<StockIt, 'id' | 'itemName' | 'serialNum' | 'imageUrl'>
  ) }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'roles' | 'position' | 'branch' | 'departments' | 'fullNameTH' | 'fullNameEN' | 'nickName' | 'imageUrl' | 'createdAt' | 'updatedAt'>
);

export type CreateCustomerMutationVariables = Exact<{
  input: Customer_Input;
}>;


export type CreateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { createCustomer: (
    { __typename?: 'Customer_Response' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorResell' }
      & Pick<FieldErrorResell, 'field' | 'message'>
    )>>, customers?: Maybe<Array<(
      { __typename?: 'Customer' }
      & RegularCustomerFragment
    )>> }
  ) }
);

export type CreateGiveMutationVariables = Exact<{
  input: GiveInput;
  options: Scalars['Upload'];
}>;


export type CreateGiveMutation = (
  { __typename?: 'Mutation' }
  & { createGive: (
    { __typename?: 'GiveResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, give?: Maybe<Array<(
      { __typename?: 'Give' }
      & RegularGiveFragment
    )>> }
  ) }
);

export type CreateGiveCatMutationVariables = Exact<{
  catName: Scalars['String'];
}>;


export type CreateGiveCatMutation = (
  { __typename?: 'Mutation' }
  & { createGiveCat: (
    { __typename?: 'GiveCatResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, giveCat?: Maybe<Array<(
      { __typename?: 'GiveCategory' }
      & RegularGiveCatFragment
    )>> }
  ) }
);

export type CreateGiveCdcMutationVariables = Exact<{
  input: GiveInput;
  options: Scalars['Upload'];
}>;


export type CreateGiveCdcMutation = (
  { __typename?: 'Mutation' }
  & { createGiveCdc: (
    { __typename?: 'GiveCdcResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, give?: Maybe<Array<(
      { __typename?: 'GiveCdc' }
      & RegularGiveCdcFragment
    )>> }
  ) }
);

export type CreateGiveOrderMutationVariables = Exact<{
  input: GiveOrderInput;
}>;


export type CreateGiveOrderMutation = (
  { __typename?: 'Mutation' }
  & { createGiveOrder: (
    { __typename?: 'GiveOrderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, giveOrder?: Maybe<Array<(
      { __typename?: 'GiveOrder' }
      & RegularGiveOrdersFragment
    )>> }
  ) }
);

export type CreateGiveOrderCdcMutationVariables = Exact<{
  input: GiveOrderInput;
}>;


export type CreateGiveOrderCdcMutation = (
  { __typename?: 'Mutation' }
  & { createGiveOrderCdc: (
    { __typename?: 'GiveOrderCdcResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, giveOrder?: Maybe<Array<(
      { __typename?: 'GiveOrderCdc' }
      & RegularGiveOrdersCdcFragment
    )>> }
  ) }
);

export type CreateJobItMutationVariables = Exact<{
  input: JobIt_Input;
}>;


export type CreateJobItMutation = (
  { __typename?: 'Mutation' }
  & { createJobIT: (
    { __typename?: 'JobIT_Response' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorJobIT' }
      & Pick<FieldErrorJobIt, 'field' | 'message'>
    )>>, jobIT?: Maybe<Array<(
      { __typename?: 'JobIT' }
      & RegularJobItFragment
    )>> }
  ) }
);

export type CreateLeaveMutationVariables = Exact<{
  input: Leave_Input;
}>;


export type CreateLeaveMutation = (
  { __typename?: 'Mutation' }
  & { createLeave: (
    { __typename?: 'Leave_Response' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorLeave' }
      & Pick<FieldErrorLeave, 'field' | 'message'>
    )>>, leave?: Maybe<Array<(
      { __typename?: 'Leave' }
      & RegularLeaveFragment
    )>> }
  ) }
);

export type CreateProductByTierMutationVariables = Exact<{
  input: ProductByTierInput;
}>;


export type CreateProductByTierMutation = (
  { __typename?: 'Mutation' }
  & { createProductByTier: (
    { __typename?: 'ProductByTier' }
    & Pick<ProductByTier, 'id' | 'productName' | 'description' | 'category' | 'creatorId' | 'creatorName' | 'createdAt' | 'updatedAt'>
  ) }
);

export type CreateResellMutationVariables = Exact<{
  input: Resell_Input;
}>;


export type CreateResellMutation = (
  { __typename?: 'Mutation' }
  & { createResell: (
    { __typename?: 'Resell_Response' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorResell' }
      & Pick<FieldErrorResell, 'field' | 'message'>
    )>>, resells?: Maybe<Array<(
      { __typename?: 'Resell' }
      & RegularResellFragment
    )>> }
  ) }
);

export type CreateSalesIssueMutationVariables = Exact<{
  input: SalesIssue_Input;
}>;


export type CreateSalesIssueMutation = (
  { __typename?: 'Mutation' }
  & { createSalesIssue: (
    { __typename?: 'SalesIssue_Response' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorSalesRole' }
      & Pick<FieldErrorSalesRole, 'field' | 'message'>
    )>>, salesIssues?: Maybe<Array<(
      { __typename?: 'SalesIssue' }
      & RegularSalesIssueFragment
    )>> }
  ) }
);

export type CreateSalesRoleMutationVariables = Exact<{
  input: SalesRole_Input;
}>;


export type CreateSalesRoleMutation = (
  { __typename?: 'Mutation' }
  & { createSalesRole: (
    { __typename?: 'SalesRole_Response' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorSalesRole' }
      & Pick<FieldErrorSalesRole, 'field' | 'message'>
    )>>, salesRoles?: Maybe<Array<(
      { __typename?: 'SalesRole' }
      & RegularSalesRoleFragment
    )>> }
  ) }
);

export type CreateStockItMutationVariables = Exact<{
  input: StockItInput;
  options: Scalars['Upload'];
}>;


export type CreateStockItMutation = (
  { __typename?: 'Mutation' }
  & { createStockIt: (
    { __typename?: 'StockItResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorStockIt' }
      & Pick<FieldErrorStockIt, 'field' | 'message'>
    )>>, stockIt?: Maybe<Array<(
      { __typename?: 'StockIt' }
      & RegularStockItFragment
    )>> }
  ) }
);

export type CreateStockItOrderMutationVariables = Exact<{
  input: StockItOrderInput;
}>;


export type CreateStockItOrderMutation = (
  { __typename?: 'Mutation' }
  & { createStockItOrder: (
    { __typename?: 'StockItOrderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorStockIt' }
      & Pick<FieldErrorStockIt, 'field' | 'message'>
    )>>, stockItOrder?: Maybe<Array<(
      { __typename?: 'StockItOrder' }
      & RegularStockItOrderFragment
    )>> }
  ) }
);

export type DeleteGiveMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGiveMutation = (
  { __typename?: 'Mutation' }
  & { deleteGive: (
    { __typename?: 'GiveResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, give?: Maybe<Array<(
      { __typename?: 'Give' }
      & RegularGiveFragment
    )>> }
  ) }
);

export type DeleteGiveCdcMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGiveCdcMutation = (
  { __typename?: 'Mutation' }
  & { deleteGiveCdc: (
    { __typename?: 'GiveCdcResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, give?: Maybe<Array<(
      { __typename?: 'GiveCdc' }
      & RegularGiveCdcFragment
    )>> }
  ) }
);

export type DeleteGiveOrderMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGiveOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteGiveOrder'>
);

export type DeleteGiveOrderCdcMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGiveOrderCdcMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteGiveOrderCdc'>
);

export type DeleteJoinResellMutationVariables = Exact<{
  input: JoinResellInput;
}>;


export type DeleteJoinResellMutation = (
  { __typename?: 'Mutation' }
  & { deleteJoinResell: (
    { __typename?: 'Resell' }
    & RegularResellFragment
  ) }
);

export type DeleteStockItMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteStockItMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteStockIt'>
);

export type DeleteStockItOrderMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteStockItOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteStockItOrder'>
);

export type JobItCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  input: Scalars['String'];
}>;


export type JobItCommentMutation = (
  { __typename?: 'Mutation' }
  & { jobITComment: (
    { __typename?: 'JobIT' }
    & RegularJobItFragment
  ) }
);

export type JoinFactoryMutationVariables = Exact<{
  input: JoinTierInput;
}>;


export type JoinFactoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinFactory'>
);

export type JoinResellMutationVariables = Exact<{
  input: JoinResellInput;
}>;


export type JoinResellMutation = (
  { __typename?: 'Mutation' }
  & { joinResell: (
    { __typename?: 'Resell' }
    & RegularResellFragment
  ) }
);

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type UpdateGiveMutationVariables = Exact<{
  id: Scalars['Int'];
  input: GiveInput;
}>;


export type UpdateGiveMutation = (
  { __typename?: 'Mutation' }
  & { updateGive: (
    { __typename?: 'UpdateGiveResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, give?: Maybe<(
      { __typename?: 'Give' }
      & RegularGiveFragment
    )> }
  ) }
);

export type UpdateGiveCdcMutationVariables = Exact<{
  id: Scalars['Int'];
  input: GiveInput;
}>;


export type UpdateGiveCdcMutation = (
  { __typename?: 'Mutation' }
  & { updateGiveCdc: (
    { __typename?: 'UpdateGiveCdcResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, give?: Maybe<(
      { __typename?: 'GiveCdc' }
      & RegularGiveCdcFragment
    )> }
  ) }
);

export type UpdateGiveOrderMutationVariables = Exact<{
  id: Scalars['Int'];
  newStatus: Scalars['String'];
}>;


export type UpdateGiveOrderMutation = (
  { __typename?: 'Mutation' }
  & { updateGiveOrder: (
    { __typename?: 'UpdateGiveOrderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, giveOrder?: Maybe<(
      { __typename?: 'GiveOrder' }
      & RegularGiveOrdersFragment
    )> }
  ) }
);

export type UpdateGiveOrderCdcMutationVariables = Exact<{
  id: Scalars['Int'];
  newStatus: Scalars['String'];
}>;


export type UpdateGiveOrderCdcMutation = (
  { __typename?: 'Mutation' }
  & { updateGiveOrderCdc: (
    { __typename?: 'UpdateGiveOrderCdcResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorGive' }
      & Pick<FieldErrorGive, 'field' | 'message'>
    )>>, giveOrder?: Maybe<(
      { __typename?: 'GiveOrderCdc' }
      & RegularGiveOrdersCdcFragment
    )> }
  ) }
);

export type UpdateJobItMutationVariables = Exact<{
  id: Scalars['Int'];
  newStatus: Scalars['String'];
}>;


export type UpdateJobItMutation = (
  { __typename?: 'Mutation' }
  & { updateJobIT: (
    { __typename?: 'JobIT' }
    & RegularJobItFragment
  ) }
);

export type UpdateLeaveMutationVariables = Exact<{
  id: Scalars['Int'];
  newStatus: Scalars['String'];
}>;


export type UpdateLeaveMutation = (
  { __typename?: 'Mutation' }
  & { updateLeave: (
    { __typename?: 'Leave' }
    & RegularLeaveFragment
  ) }
);

export type UpdateRolesMutationVariables = Exact<{
  id: Scalars['Int'];
  newRoles: Scalars['String'];
  newPosition: Scalars['String'];
  newBranch: Scalars['String'];
}>;


export type UpdateRolesMutation = (
  { __typename?: 'Mutation' }
  & { updateRoles: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type UpdateStockItMutationVariables = Exact<{
  id: Scalars['Int'];
  input: StockItInput;
}>;


export type UpdateStockItMutation = (
  { __typename?: 'Mutation' }
  & { updateStockIt: (
    { __typename?: 'UpdateStockItResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorStockIt' }
      & Pick<FieldErrorStockIt, 'field' | 'message'>
    )>>, stockIt?: Maybe<(
      { __typename?: 'StockIt' }
      & RegularStockItFragment
    )> }
  ) }
);

export type UpdateStockItOrMutationVariables = Exact<{
  id: Scalars['Int'];
  holdStatus: Scalars['String'];
  newStatus: Scalars['String'];
}>;


export type UpdateStockItOrMutation = (
  { __typename?: 'Mutation' }
  & { updateStockItOr: (
    { __typename?: 'UpdateStockItOrResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorStockIt' }
      & Pick<FieldErrorStockIt, 'field' | 'message'>
    )>>, stockItOrder?: Maybe<(
      { __typename?: 'StockItOrder' }
      & RegularStockItOrderFragment
    )> }
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  options: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type UploadImageMeMutationVariables = Exact<{
  options: Scalars['Upload'];
}>;


export type UploadImageMeMutation = (
  { __typename?: 'Mutation' }
  & { uploadImageMe: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type AmphuresPvIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AmphuresPvIdQuery = (
  { __typename?: 'Query' }
  & { amphuresPvId: Array<(
    { __typename?: 'Amphures' }
    & Pick<Amphures, 'id' | 'name_th'>
  )> }
);

export type CustomerByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CustomerByIdQuery = (
  { __typename?: 'Query' }
  & { customerById: (
    { __typename?: 'Customer' }
    & RegularCustomerFragment
  ) }
);

export type CustomerJsrQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomerJsrQuery = (
  { __typename?: 'Query' }
  & { customerJsr?: Maybe<Array<(
    { __typename?: 'CustomerJsr' }
    & Pick<CustomerJsr, 'id' | 'customerCode' | 'customerPrefix' | 'customerName'>
  )>> }
);

export type CustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomersQuery = (
  { __typename?: 'Query' }
  & { customers?: Maybe<Array<(
    { __typename?: 'Customer' }
    & RegularCustomerFragment
  )>> }
);

export type DistrictsApIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DistrictsApIdQuery = (
  { __typename?: 'Query' }
  & { districtsApId: Array<(
    { __typename?: 'Districts' }
    & Pick<Districts, 'id' | 'zip_code' | 'name_th'>
  )> }
);

export type FactoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FactoriesQuery = (
  { __typename?: 'Query' }
  & { factories: Array<(
    { __typename?: 'Factory' }
    & Pick<Factory, 'id' | 'industrialEstate' | 'businessType' | 'companyName' | 'description' | 'address' | 'phoneNumber' | 'FAX' | 'Email'>
  )> }
);

export type GiveByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GiveByIdQuery = (
  { __typename?: 'Query' }
  & { giveById: (
    { __typename?: 'Give' }
    & RegularGiveFragment
  ) }
);

export type GiveByIdCdcQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GiveByIdCdcQuery = (
  { __typename?: 'Query' }
  & { giveByIdCdc: (
    { __typename?: 'GiveCdc' }
    & RegularGiveCdcFragment
  ) }
);

export type GiveCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GiveCategoriesQuery = (
  { __typename?: 'Query' }
  & { giveCategories?: Maybe<Array<(
    { __typename?: 'GiveCategory' }
    & RegularGiveCatFragment
  )>> }
);

export type GiveOrderByCreatorIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GiveOrderByCreatorIdQuery = (
  { __typename?: 'Query' }
  & { giveOrderByCreatorId?: Maybe<Array<(
    { __typename?: 'GiveOrder' }
    & RegularGiveOrdersFragment
  )>> }
);

export type GiveOrderByCreatorIdCdcQueryVariables = Exact<{ [key: string]: never; }>;


export type GiveOrderByCreatorIdCdcQuery = (
  { __typename?: 'Query' }
  & { giveOrderByCreatorIdCdc?: Maybe<Array<(
    { __typename?: 'GiveOrderCdc' }
    & RegularGiveOrdersCdcFragment
  )>> }
);

export type GiveOrderByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GiveOrderByIdQuery = (
  { __typename?: 'Query' }
  & { giveOrderById: (
    { __typename?: 'GiveOrder' }
    & RegularGiveOrdersFragment
  ) }
);

export type GiveOrderByIdCdcQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GiveOrderByIdCdcQuery = (
  { __typename?: 'Query' }
  & { giveOrderByIdCdc: (
    { __typename?: 'GiveOrderCdc' }
    & RegularGiveOrdersCdcFragment
  ) }
);

export type GiveOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GiveOrdersQuery = (
  { __typename?: 'Query' }
  & { giveOrders?: Maybe<Array<(
    { __typename?: 'GiveOrder' }
    & RegularGiveOrdersFragment
  )>> }
);

export type GiveOrdersCdcQueryVariables = Exact<{ [key: string]: never; }>;


export type GiveOrdersCdcQuery = (
  { __typename?: 'Query' }
  & { giveOrdersCdc?: Maybe<Array<(
    { __typename?: 'GiveOrderCdc' }
    & RegularGiveOrdersCdcFragment
  )>> }
);

export type GivesQueryVariables = Exact<{ [key: string]: never; }>;


export type GivesQuery = (
  { __typename?: 'Query' }
  & { gives?: Maybe<Array<(
    { __typename?: 'Give' }
    & RegularGiveFragment
  )>> }
);

export type GivesCdcQueryVariables = Exact<{ [key: string]: never; }>;


export type GivesCdcQuery = (
  { __typename?: 'Query' }
  & { givesCdc?: Maybe<Array<(
    { __typename?: 'GiveCdc' }
    & RegularGiveCdcFragment
  )>> }
);

export type IssueByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type IssueByIdQuery = (
  { __typename?: 'Query' }
  & { issueById?: Maybe<(
    { __typename?: 'SalesIssue' }
    & RegularSalesIssueFragment
  )> }
);

export type JobItByCreatorIdQueryVariables = Exact<{ [key: string]: never; }>;


export type JobItByCreatorIdQuery = (
  { __typename?: 'Query' }
  & { jobITByCreatorId?: Maybe<Array<(
    { __typename?: 'JobIT' }
    & RegularJobItFragment
  )>> }
);

export type JobItByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type JobItByIdQuery = (
  { __typename?: 'Query' }
  & { jobITById: (
    { __typename?: 'JobIT' }
    & RegularJobItFragment
  ) }
);

export type JobITsQueryVariables = Exact<{
  input: QueryJobIt_Input;
}>;


export type JobITsQuery = (
  { __typename?: 'Query' }
  & { jobITs?: Maybe<Array<(
    { __typename?: 'JobIT' }
    & RegularJobItFragment
  )>> }
);

export type LeavesQueryVariables = Exact<{
  createBy: Scalars['Boolean'];
}>;


export type LeavesQuery = (
  { __typename?: 'Query' }
  & { leaves?: Maybe<Array<(
    { __typename?: 'Leave' }
    & RegularLeaveFragment
  )>> }
);

export type ManualAdByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ManualAdByIdQuery = (
  { __typename?: 'Query' }
  & { manualADById: (
    { __typename?: 'ManualAD' }
    & RegularManualAdFragment
  ) }
);

export type ManualADsQueryVariables = Exact<{ [key: string]: never; }>;


export type ManualADsQuery = (
  { __typename?: 'Query' }
  & { manualADs: Array<(
    { __typename?: 'ManualAD' }
    & RegularManualAdFragment
  )> }
);

export type ProductByTiersQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductByTiersQuery = (
  { __typename?: 'Query' }
  & { ProductByTiers: Array<Maybe<(
    { __typename?: 'ProductByTier' }
    & Pick<ProductByTier, 'id' | 'productName' | 'description' | 'category' | 'creatorName' | 'creatorId'>
    & { factorys?: Maybe<Array<(
      { __typename?: 'Factory' }
      & Pick<Factory, 'id' | 'companyName'>
      & { products: Array<(
        { __typename?: 'ProductByTier' }
        & Pick<ProductByTier, 'id' | 'productName' | 'description' | 'category' | 'creatorName' | 'creatorId'>
      )> }
    )>> }
  )>> }
);

export type QueryProvincesQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryProvincesQuery = (
  { __typename?: 'Query' }
  & { queryProvinces: Array<(
    { __typename?: 'Provinces' }
    & Pick<Provinces, 'id' | 'name_th'>
  )> }
);

export type ResellByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ResellByIdQuery = (
  { __typename?: 'Query' }
  & { resellById: (
    { __typename?: 'Resell' }
    & RegularResellFragment
  ) }
);

export type ResellsQueryVariables = Exact<{ [key: string]: never; }>;


export type ResellsQuery = (
  { __typename?: 'Query' }
  & { resells?: Maybe<Array<(
    { __typename?: 'Resell' }
    & RegularResellFragment
  )>> }
);

export type ResellsByCreatorQueryVariables = Exact<{ [key: string]: never; }>;


export type ResellsByCreatorQuery = (
  { __typename?: 'Query' }
  & { resellsByCreator?: Maybe<Array<(
    { __typename?: 'Resell' }
    & RegularResellFragment
  )>> }
);

export type SalesBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type SalesBrandsQuery = (
  { __typename?: 'Query' }
  & { salesBrands?: Maybe<Array<(
    { __typename?: 'SalesBrand' }
    & Pick<SalesBrand, 'id' | 'brand'>
  )>> }
);

export type SalesRoleByIdQueryVariables = Exact<{
  id: Scalars['Int'];
  monthIndex: Scalars['Int'];
}>;


export type SalesRoleByIdQuery = (
  { __typename?: 'Query' }
  & { salesRoleById: (
    { __typename?: 'SalesRole' }
    & Pick<SalesRole, 'id' | 'salesRole' | 'areaCode' | 'channel' | 'branch' | 'status' | 'userId'>
    & { targets: Array<(
      { __typename?: 'SalesTarget' }
      & Pick<SalesTarget, 'id' | 'year' | 'value' | 'branch'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullNameTH' | 'imageUrl'>
    ), issues: Array<(
      { __typename?: 'SalesIssue' }
      & Pick<SalesIssue, 'id' | 'saleRoleId' | 'saleName' | 'contact' | 'customer' | 'quotationNo' | 'brand' | 'category' | 'detail' | 'prob' | 'status' | 'value' | 'branch' | 'createdAt' | 'updatedAt'>
    )>, salesActual: Array<(
      { __typename?: 'SalesActual' }
      & Pick<SalesActual, 'id' | 'title' | 'detail' | 'actual' | 'branch' | 'customerId' | 'userId' | 'salesRoleId' | 'createdAt' | 'updatedAt'>
      & { customer: (
        { __typename?: 'Customer' }
        & Pick<Customer, 'id' | 'customerName'>
      ), user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'fullNameTH'>
      ) }
    )> }
  ) }
);

export type SalesRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type SalesRolesQuery = (
  { __typename?: 'Query' }
  & { salesRoles?: Maybe<Array<(
    { __typename?: 'SalesRole' }
    & Pick<SalesRole, 'id' | 'salesRole' | 'channel' | 'branch' | 'status' | 'userId'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullNameTH' | 'imageUrl'>
    ) }
  )>> }
);

export type StockItByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type StockItByIdQuery = (
  { __typename?: 'Query' }
  & { stockItById: (
    { __typename?: 'StockIt' }
    & RegularStockItFragment
  ) }
);

export type StockItsQueryVariables = Exact<{ [key: string]: never; }>;


export type StockItsQuery = (
  { __typename?: 'Query' }
  & { stockIts?: Maybe<Array<(
    { __typename?: 'StockIt' }
    & RegularStockItFragment
  )>> }
);

export type UserAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type UserAdminQuery = (
  { __typename?: 'Query' }
  & { userAdmin: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type FactoryByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FactoryByIdQuery = (
  { __typename?: 'Query' }
  & { factoryById?: Maybe<(
    { __typename?: 'Factory' }
    & Pick<Factory, 'id' | 'industrialEstate' | 'businessType' | 'companyName' | 'description' | 'address' | 'phoneNumber' | 'FAX' | 'Email'>
    & { products: Array<(
      { __typename?: 'ProductByTier' }
      & Pick<ProductByTier, 'id' | 'productName' | 'description' | 'category' | 'creatorId' | 'creatorName' | 'createdAt' | 'updatedAt'>
      & { factorys?: Maybe<Array<(
        { __typename?: 'Factory' }
        & Pick<Factory, 'id' | 'industrialEstate' | 'businessType' | 'companyName' | 'description' | 'address' | 'phoneNumber' | 'FAX' | 'Email'>
      )>> }
    )>, productReceives?: Maybe<Array<(
      { __typename?: 'ProductByTier' }
      & Pick<ProductByTier, 'id' | 'productName' | 'description' | 'category' | 'creatorName' | 'creatorId' | 'createdAt' | 'updatedAt'>
      & { factorys?: Maybe<Array<(
        { __typename?: 'Factory' }
        & Pick<Factory, 'id' | 'industrialEstate' | 'businessType' | 'companyName' | 'description' | 'address' | 'phoneNumber' | 'FAX' | 'Email'>
      )>> }
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type StockItOrderByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type StockItOrderByIdQuery = (
  { __typename?: 'Query' }
  & { stockItOrderById: (
    { __typename?: 'StockItOrder' }
    & RegularStockItOrderFragment
  ) }
);

export type StockItOrdersQueryVariables = Exact<{
  createBy: Scalars['Boolean'];
}>;


export type StockItOrdersQuery = (
  { __typename?: 'Query' }
  & { stockItOrders?: Maybe<Array<(
    { __typename?: 'StockItOrder' }
    & RegularStockItOrderFragment
  )>> }
);

export const RegularCustomerFragmentDoc = gql`
    fragment RegularCustomer on Customer {
  id
  customerCode
  customerName
  phone
  email
  province
  amphure
  district
  zipCode
  creatorId
  createdAt
  updatedAt
  creator {
    id
    username
  }
  orderResell {
    id
    maker
    title
  }
}
    `;
export const RegularGiveCatFragmentDoc = gql`
    fragment RegularGiveCat on GiveCategory {
  id
  catName
}
    `;
export const RegularGiveFragmentDoc = gql`
    fragment RegularGive on Give {
  id
  giveName
  details
  price
  inventory
  category
  imageUrl
  createdAt
  updatedAt
}
    `;
export const RegularGiveOrdersFragmentDoc = gql`
    fragment RegularGiveOrders on GiveOrder {
  id
  creatorId
  giveId
  amount
  price
  customerId
  customerDetail
  status
  give {
    ...RegularGive
  }
  creator {
    id
    roles
    departments
    fullNameTH
  }
  createdAt
  updatedAt
}
    ${RegularGiveFragmentDoc}`;
export const RegularGiveCdcFragmentDoc = gql`
    fragment RegularGiveCdc on GiveCdc {
  id
  giveName
  details
  price
  inventory
  category
  imageUrl
  createdAt
  updatedAt
}
    `;
export const RegularGiveOrdersCdcFragmentDoc = gql`
    fragment RegularGiveOrdersCdc on GiveOrderCdc {
  id
  creatorId
  giveId
  amount
  price
  customerId
  customerDetail
  status
  give {
    ...RegularGiveCdc
  }
  creator {
    id
    roles
    departments
    fullNameTH
  }
  createdAt
  updatedAt
}
    ${RegularGiveCdcFragmentDoc}`;
export const RegularJobItFragmentDoc = gql`
    fragment RegularJobIT on JobIT {
  id
  titled
  desiredDate
  category
  status
  itComment
  itActionName
  branch
  creatorId
  createdAt
  updatedAt
  creator {
    id
    roles
    departments
    fullNameTH
  }
}
    `;
export const RegularLeaveFragmentDoc = gql`
    fragment RegularLeave on Leave {
  id
  title
  detail
  sumDate
  sumHour
  dateBegin
  dateEnd
  status
  BossActionName
  creatorId
  branch
  pdfFile
  createdAt
  updatedAt
  creator {
    id
    fullNameTH
    departments
    position
    imageUrl
  }
}
    `;
export const RegularManualAdFragmentDoc = gql`
    fragment RegularManualAD on ManualAD {
  id
  factoryName
  email
  telephoneNumber
  createdAt
  updatedAt
  manualADUrl {
    id
    manualId
    title
    url
    createdAt
    updatedAt
  }
}
    `;
export const RegularResellFragmentDoc = gql`
    fragment RegularResell on Resell {
  id
  orderId
  maker
  title
  detail
  category
  creatorId
  createdAt
  updatedAt
  creator {
    id
    fullNameTH
  }
  orderCustomer {
    id
    customerCode
    customerName
  }
  customers {
    id
    customerCode
    customerName
  }
}
    `;
export const RegularSalesIssueFragmentDoc = gql`
    fragment RegularSalesIssue on SalesIssue {
  id
  saleRoleId
  saleName
  contact
  customer
  quotationNo
  category
  detail
  prob
  status
  value
  branch
  createdAt
  updatedAt
  brand
  saleRole {
    id
    salesRole
    channel
  }
}
    `;
export const RegularSalesRoleFragmentDoc = gql`
    fragment RegularSalesRole on SalesRole {
  id
  salesRole
  channel
  userId
  branch
  status
}
    `;
export const RegularStockItFragmentDoc = gql`
    fragment RegularStockIt on StockIt {
  id
  itemName
  detail
  location
  serialNum
  warranty
  price
  currentStatus
  branch
  brand
  category
  imageUrl
  createdAt
  updatedAt
  orders {
    id
    holdStatus
    updatedAt
    creator {
      id
      fullNameTH
    }
  }
}
    `;
export const RegularStockItOrderFragmentDoc = gql`
    fragment RegularStockItOrder on StockItOrder {
  id
  detail
  branch
  creatorId
  stockItId
  holdStatus
  status
  createdAt
  updatedAt
  creator {
    id
    fullNameTH
    roles
  }
  stockIt {
    id
    itemName
    serialNum
    imageUrl
  }
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  roles
  position
  branch
  departments
  fullNameTH
  fullNameEN
  nickName
  imageUrl
  createdAt
  updatedAt
}
    `;
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($input: Customer_Input!) {
  createCustomer(input: $input) {
    errors {
      field
      message
    }
    customers {
      ...RegularCustomer
    }
  }
}
    ${RegularCustomerFragmentDoc}`;

export function useCreateCustomerMutation() {
  return Urql.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument);
};
export const CreateGiveDocument = gql`
    mutation CreateGive($input: GiveInput!, $options: Upload!) {
  createGive(input: $input, options: $options) {
    errors {
      field
      message
    }
    give {
      ...RegularGive
    }
  }
}
    ${RegularGiveFragmentDoc}`;

export function useCreateGiveMutation() {
  return Urql.useMutation<CreateGiveMutation, CreateGiveMutationVariables>(CreateGiveDocument);
};
export const CreateGiveCatDocument = gql`
    mutation CreateGiveCat($catName: String!) {
  createGiveCat(catName: $catName) {
    errors {
      field
      message
    }
    giveCat {
      ...RegularGiveCat
    }
  }
}
    ${RegularGiveCatFragmentDoc}`;

export function useCreateGiveCatMutation() {
  return Urql.useMutation<CreateGiveCatMutation, CreateGiveCatMutationVariables>(CreateGiveCatDocument);
};
export const CreateGiveCdcDocument = gql`
    mutation CreateGiveCdc($input: GiveInput!, $options: Upload!) {
  createGiveCdc(input: $input, options: $options) {
    errors {
      field
      message
    }
    give {
      ...RegularGiveCdc
    }
  }
}
    ${RegularGiveCdcFragmentDoc}`;

export function useCreateGiveCdcMutation() {
  return Urql.useMutation<CreateGiveCdcMutation, CreateGiveCdcMutationVariables>(CreateGiveCdcDocument);
};
export const CreateGiveOrderDocument = gql`
    mutation CreateGiveOrder($input: giveOrderInput!) {
  createGiveOrder(input: $input) {
    errors {
      field
      message
    }
    giveOrder {
      ...RegularGiveOrders
    }
  }
}
    ${RegularGiveOrdersFragmentDoc}`;

export function useCreateGiveOrderMutation() {
  return Urql.useMutation<CreateGiveOrderMutation, CreateGiveOrderMutationVariables>(CreateGiveOrderDocument);
};
export const CreateGiveOrderCdcDocument = gql`
    mutation CreateGiveOrderCdc($input: giveOrderInput!) {
  createGiveOrderCdc(input: $input) {
    errors {
      field
      message
    }
    giveOrder {
      ...RegularGiveOrdersCdc
    }
  }
}
    ${RegularGiveOrdersCdcFragmentDoc}`;

export function useCreateGiveOrderCdcMutation() {
  return Urql.useMutation<CreateGiveOrderCdcMutation, CreateGiveOrderCdcMutationVariables>(CreateGiveOrderCdcDocument);
};
export const CreateJobItDocument = gql`
    mutation CreateJobIT($input: JobIT_Input!) {
  createJobIT(input: $input) {
    errors {
      field
      message
    }
    jobIT {
      ...RegularJobIT
    }
  }
}
    ${RegularJobItFragmentDoc}`;

export function useCreateJobItMutation() {
  return Urql.useMutation<CreateJobItMutation, CreateJobItMutationVariables>(CreateJobItDocument);
};
export const CreateLeaveDocument = gql`
    mutation CreateLeave($input: Leave_Input!) {
  createLeave(input: $input) {
    errors {
      field
      message
    }
    leave {
      ...RegularLeave
    }
  }
}
    ${RegularLeaveFragmentDoc}`;

export function useCreateLeaveMutation() {
  return Urql.useMutation<CreateLeaveMutation, CreateLeaveMutationVariables>(CreateLeaveDocument);
};
export const CreateProductByTierDocument = gql`
    mutation createProductByTier($input: ProductByTierInput!) {
  createProductByTier(input: $input) {
    id
    productName
    description
    category
    creatorId
    creatorName
    createdAt
    updatedAt
  }
}
    `;

export function useCreateProductByTierMutation() {
  return Urql.useMutation<CreateProductByTierMutation, CreateProductByTierMutationVariables>(CreateProductByTierDocument);
};
export const CreateResellDocument = gql`
    mutation CreateResell($input: Resell_Input!) {
  createResell(input: $input) {
    errors {
      field
      message
    }
    resells {
      ...RegularResell
    }
  }
}
    ${RegularResellFragmentDoc}`;

export function useCreateResellMutation() {
  return Urql.useMutation<CreateResellMutation, CreateResellMutationVariables>(CreateResellDocument);
};
export const CreateSalesIssueDocument = gql`
    mutation CreateSalesIssue($input: SalesIssue_Input!) {
  createSalesIssue(input: $input) {
    errors {
      field
      message
    }
    salesIssues {
      ...RegularSalesIssue
    }
  }
}
    ${RegularSalesIssueFragmentDoc}`;

export function useCreateSalesIssueMutation() {
  return Urql.useMutation<CreateSalesIssueMutation, CreateSalesIssueMutationVariables>(CreateSalesIssueDocument);
};
export const CreateSalesRoleDocument = gql`
    mutation CreateSalesRole($input: SalesRole_Input!) {
  createSalesRole(input: $input) {
    errors {
      field
      message
    }
    salesRoles {
      ...RegularSalesRole
    }
  }
}
    ${RegularSalesRoleFragmentDoc}`;

export function useCreateSalesRoleMutation() {
  return Urql.useMutation<CreateSalesRoleMutation, CreateSalesRoleMutationVariables>(CreateSalesRoleDocument);
};
export const CreateStockItDocument = gql`
    mutation CreateStockIt($input: StockItInput!, $options: Upload!) {
  createStockIt(input: $input, options: $options) {
    errors {
      field
      message
    }
    stockIt {
      ...RegularStockIt
    }
  }
}
    ${RegularStockItFragmentDoc}`;

export function useCreateStockItMutation() {
  return Urql.useMutation<CreateStockItMutation, CreateStockItMutationVariables>(CreateStockItDocument);
};
export const CreateStockItOrderDocument = gql`
    mutation CreateStockItOrder($input: StockItOrderInput!) {
  createStockItOrder(input: $input) {
    errors {
      field
      message
    }
    stockItOrder {
      ...RegularStockItOrder
    }
  }
}
    ${RegularStockItOrderFragmentDoc}`;

export function useCreateStockItOrderMutation() {
  return Urql.useMutation<CreateStockItOrderMutation, CreateStockItOrderMutationVariables>(CreateStockItOrderDocument);
};
export const DeleteGiveDocument = gql`
    mutation DeleteGive($id: Int!) {
  deleteGive(id: $id) {
    errors {
      field
      message
    }
    give {
      ...RegularGive
    }
  }
}
    ${RegularGiveFragmentDoc}`;

export function useDeleteGiveMutation() {
  return Urql.useMutation<DeleteGiveMutation, DeleteGiveMutationVariables>(DeleteGiveDocument);
};
export const DeleteGiveCdcDocument = gql`
    mutation DeleteGiveCdc($id: Int!) {
  deleteGiveCdc(id: $id) {
    errors {
      field
      message
    }
    give {
      ...RegularGiveCdc
    }
  }
}
    ${RegularGiveCdcFragmentDoc}`;

export function useDeleteGiveCdcMutation() {
  return Urql.useMutation<DeleteGiveCdcMutation, DeleteGiveCdcMutationVariables>(DeleteGiveCdcDocument);
};
export const DeleteGiveOrderDocument = gql`
    mutation DeleteGiveOrder($id: Int!) {
  deleteGiveOrder(id: $id)
}
    `;

export function useDeleteGiveOrderMutation() {
  return Urql.useMutation<DeleteGiveOrderMutation, DeleteGiveOrderMutationVariables>(DeleteGiveOrderDocument);
};
export const DeleteGiveOrderCdcDocument = gql`
    mutation DeleteGiveOrderCdc($id: Int!) {
  deleteGiveOrderCdc(id: $id)
}
    `;

export function useDeleteGiveOrderCdcMutation() {
  return Urql.useMutation<DeleteGiveOrderCdcMutation, DeleteGiveOrderCdcMutationVariables>(DeleteGiveOrderCdcDocument);
};
export const DeleteJoinResellDocument = gql`
    mutation DeleteJoinResell($input: JoinResellInput!) {
  deleteJoinResell(input: $input) {
    ...RegularResell
  }
}
    ${RegularResellFragmentDoc}`;

export function useDeleteJoinResellMutation() {
  return Urql.useMutation<DeleteJoinResellMutation, DeleteJoinResellMutationVariables>(DeleteJoinResellDocument);
};
export const DeleteStockItDocument = gql`
    mutation DeleteStockIt($id: Int!) {
  deleteStockIt(id: $id)
}
    `;

export function useDeleteStockItMutation() {
  return Urql.useMutation<DeleteStockItMutation, DeleteStockItMutationVariables>(DeleteStockItDocument);
};
export const DeleteStockItOrderDocument = gql`
    mutation DeleteStockItOrder($id: Int!) {
  deleteStockItOrder(id: $id)
}
    `;

export function useDeleteStockItOrderMutation() {
  return Urql.useMutation<DeleteStockItOrderMutation, DeleteStockItOrderMutationVariables>(DeleteStockItOrderDocument);
};
export const JobItCommentDocument = gql`
    mutation JobITComment($id: Int!, $input: String!) {
  jobITComment(id: $id, input: $input) {
    ...RegularJobIT
  }
}
    ${RegularJobItFragmentDoc}`;

export function useJobItCommentMutation() {
  return Urql.useMutation<JobItCommentMutation, JobItCommentMutationVariables>(JobItCommentDocument);
};
export const JoinFactoryDocument = gql`
    mutation JoinFactory($input: JoinTierInput!) {
  joinFactory(input: $input)
}
    `;

export function useJoinFactoryMutation() {
  return Urql.useMutation<JoinFactoryMutation, JoinFactoryMutationVariables>(JoinFactoryDocument);
};
export const JoinResellDocument = gql`
    mutation JoinResell($input: JoinResellInput!) {
  joinResell(input: $input) {
    ...RegularResell
  }
}
    ${RegularResellFragmentDoc}`;

export function useJoinResellMutation() {
  return Urql.useMutation<JoinResellMutation, JoinResellMutationVariables>(JoinResellDocument);
};
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateGiveDocument = gql`
    mutation UpdateGive($id: Int!, $input: GiveInput!) {
  updateGive(id: $id, input: $input) {
    errors {
      field
      message
    }
    give {
      ...RegularGive
    }
  }
}
    ${RegularGiveFragmentDoc}`;

export function useUpdateGiveMutation() {
  return Urql.useMutation<UpdateGiveMutation, UpdateGiveMutationVariables>(UpdateGiveDocument);
};
export const UpdateGiveCdcDocument = gql`
    mutation UpdateGiveCdc($id: Int!, $input: GiveInput!) {
  updateGiveCdc(id: $id, input: $input) {
    errors {
      field
      message
    }
    give {
      ...RegularGiveCdc
    }
  }
}
    ${RegularGiveCdcFragmentDoc}`;

export function useUpdateGiveCdcMutation() {
  return Urql.useMutation<UpdateGiveCdcMutation, UpdateGiveCdcMutationVariables>(UpdateGiveCdcDocument);
};
export const UpdateGiveOrderDocument = gql`
    mutation UpdateGiveOrder($id: Int!, $newStatus: String!) {
  updateGiveOrder(id: $id, newStatus: $newStatus) {
    errors {
      field
      message
    }
    giveOrder {
      ...RegularGiveOrders
    }
  }
}
    ${RegularGiveOrdersFragmentDoc}`;

export function useUpdateGiveOrderMutation() {
  return Urql.useMutation<UpdateGiveOrderMutation, UpdateGiveOrderMutationVariables>(UpdateGiveOrderDocument);
};
export const UpdateGiveOrderCdcDocument = gql`
    mutation UpdateGiveOrderCdc($id: Int!, $newStatus: String!) {
  updateGiveOrderCdc(id: $id, newStatus: $newStatus) {
    errors {
      field
      message
    }
    giveOrder {
      ...RegularGiveOrdersCdc
    }
  }
}
    ${RegularGiveOrdersCdcFragmentDoc}`;

export function useUpdateGiveOrderCdcMutation() {
  return Urql.useMutation<UpdateGiveOrderCdcMutation, UpdateGiveOrderCdcMutationVariables>(UpdateGiveOrderCdcDocument);
};
export const UpdateJobItDocument = gql`
    mutation UpdateJobIT($id: Int!, $newStatus: String!) {
  updateJobIT(id: $id, newStatus: $newStatus) {
    ...RegularJobIT
  }
}
    ${RegularJobItFragmentDoc}`;

export function useUpdateJobItMutation() {
  return Urql.useMutation<UpdateJobItMutation, UpdateJobItMutationVariables>(UpdateJobItDocument);
};
export const UpdateLeaveDocument = gql`
    mutation UpdateLeave($id: Int!, $newStatus: String!) {
  updateLeave(id: $id, newStatus: $newStatus) {
    ...RegularLeave
  }
}
    ${RegularLeaveFragmentDoc}`;

export function useUpdateLeaveMutation() {
  return Urql.useMutation<UpdateLeaveMutation, UpdateLeaveMutationVariables>(UpdateLeaveDocument);
};
export const UpdateRolesDocument = gql`
    mutation UpdateRoles($id: Int!, $newRoles: String!, $newPosition: String!, $newBranch: String!) {
  updateRoles(
    id: $id
    newRoles: $newRoles
    newPosition: $newPosition
    newBranch: $newBranch
  ) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useUpdateRolesMutation() {
  return Urql.useMutation<UpdateRolesMutation, UpdateRolesMutationVariables>(UpdateRolesDocument);
};
export const UpdateStockItDocument = gql`
    mutation UpdateStockIt($id: Int!, $input: StockItInput!) {
  updateStockIt(id: $id, input: $input) {
    errors {
      field
      message
    }
    stockIt {
      ...RegularStockIt
    }
  }
}
    ${RegularStockItFragmentDoc}`;

export function useUpdateStockItMutation() {
  return Urql.useMutation<UpdateStockItMutation, UpdateStockItMutationVariables>(UpdateStockItDocument);
};
export const UpdateStockItOrDocument = gql`
    mutation UpdateStockItOr($id: Int!, $holdStatus: String!, $newStatus: String!) {
  updateStockItOr(id: $id, holdStatus: $holdStatus, newStatus: $newStatus) {
    errors {
      field
      message
    }
    stockItOrder {
      ...RegularStockItOrder
    }
  }
}
    ${RegularStockItOrderFragmentDoc}`;

export function useUpdateStockItOrMutation() {
  return Urql.useMutation<UpdateStockItOrMutation, UpdateStockItOrMutationVariables>(UpdateStockItOrDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($options: updateUserInput!) {
  updateUser(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const UploadImageMeDocument = gql`
    mutation UploadImageMe($options: Upload!) {
  uploadImageMe(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useUploadImageMeMutation() {
  return Urql.useMutation<UploadImageMeMutation, UploadImageMeMutationVariables>(UploadImageMeDocument);
};
export const AmphuresPvIdDocument = gql`
    query AmphuresPvId($id: Int!) {
  amphuresPvId(id: $id) {
    id
    name_th
  }
}
    `;

export function useAmphuresPvIdQuery(options: Omit<Urql.UseQueryArgs<AmphuresPvIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AmphuresPvIdQuery>({ query: AmphuresPvIdDocument, ...options });
};
export const CustomerByIdDocument = gql`
    query CustomerById($id: Int!) {
  customerById(id: $id) {
    ...RegularCustomer
  }
}
    ${RegularCustomerFragmentDoc}`;

export function useCustomerByIdQuery(options: Omit<Urql.UseQueryArgs<CustomerByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CustomerByIdQuery>({ query: CustomerByIdDocument, ...options });
};
export const CustomerJsrDocument = gql`
    query CustomerJsr {
  customerJsr {
    id
    customerCode
    customerPrefix
    customerName
  }
}
    `;

export function useCustomerJsrQuery(options: Omit<Urql.UseQueryArgs<CustomerJsrQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CustomerJsrQuery>({ query: CustomerJsrDocument, ...options });
};
export const CustomersDocument = gql`
    query Customers {
  customers {
    ...RegularCustomer
  }
}
    ${RegularCustomerFragmentDoc}`;

export function useCustomersQuery(options: Omit<Urql.UseQueryArgs<CustomersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CustomersQuery>({ query: CustomersDocument, ...options });
};
export const DistrictsApIdDocument = gql`
    query DistrictsApId($id: Int!) {
  districtsApId(id: $id) {
    id
    zip_code
    name_th
  }
}
    `;

export function useDistrictsApIdQuery(options: Omit<Urql.UseQueryArgs<DistrictsApIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DistrictsApIdQuery>({ query: DistrictsApIdDocument, ...options });
};
export const FactoriesDocument = gql`
    query Factories {
  factories {
    id
    industrialEstate
    businessType
    companyName
    description
    address
    phoneNumber
    FAX
    Email
  }
}
    `;

export function useFactoriesQuery(options: Omit<Urql.UseQueryArgs<FactoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FactoriesQuery>({ query: FactoriesDocument, ...options });
};
export const GiveByIdDocument = gql`
    query GiveById($id: Int!) {
  giveById(id: $id) {
    ...RegularGive
  }
}
    ${RegularGiveFragmentDoc}`;

export function useGiveByIdQuery(options: Omit<Urql.UseQueryArgs<GiveByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GiveByIdQuery>({ query: GiveByIdDocument, ...options });
};
export const GiveByIdCdcDocument = gql`
    query GiveByIdCdc($id: Int!) {
  giveByIdCdc(id: $id) {
    ...RegularGiveCdc
  }
}
    ${RegularGiveCdcFragmentDoc}`;

export function useGiveByIdCdcQuery(options: Omit<Urql.UseQueryArgs<GiveByIdCdcQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GiveByIdCdcQuery>({ query: GiveByIdCdcDocument, ...options });
};
export const GiveCategoriesDocument = gql`
    query GiveCategories {
  giveCategories {
    ...RegularGiveCat
  }
}
    ${RegularGiveCatFragmentDoc}`;

export function useGiveCategoriesQuery(options: Omit<Urql.UseQueryArgs<GiveCategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GiveCategoriesQuery>({ query: GiveCategoriesDocument, ...options });
};
export const GiveOrderByCreatorIdDocument = gql`
    query GiveOrderByCreatorId {
  giveOrderByCreatorId {
    ...RegularGiveOrders
  }
}
    ${RegularGiveOrdersFragmentDoc}`;

export function useGiveOrderByCreatorIdQuery(options: Omit<Urql.UseQueryArgs<GiveOrderByCreatorIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GiveOrderByCreatorIdQuery>({ query: GiveOrderByCreatorIdDocument, ...options });
};
export const GiveOrderByCreatorIdCdcDocument = gql`
    query GiveOrderByCreatorIdCdc {
  giveOrderByCreatorIdCdc {
    ...RegularGiveOrdersCdc
  }
}
    ${RegularGiveOrdersCdcFragmentDoc}`;

export function useGiveOrderByCreatorIdCdcQuery(options: Omit<Urql.UseQueryArgs<GiveOrderByCreatorIdCdcQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GiveOrderByCreatorIdCdcQuery>({ query: GiveOrderByCreatorIdCdcDocument, ...options });
};
export const GiveOrderByIdDocument = gql`
    query GiveOrderById($id: Int!) {
  giveOrderById(id: $id) {
    ...RegularGiveOrders
  }
}
    ${RegularGiveOrdersFragmentDoc}`;

export function useGiveOrderByIdQuery(options: Omit<Urql.UseQueryArgs<GiveOrderByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GiveOrderByIdQuery>({ query: GiveOrderByIdDocument, ...options });
};
export const GiveOrderByIdCdcDocument = gql`
    query GiveOrderByIdCdc($id: Int!) {
  giveOrderByIdCdc(id: $id) {
    ...RegularGiveOrdersCdc
  }
}
    ${RegularGiveOrdersCdcFragmentDoc}`;

export function useGiveOrderByIdCdcQuery(options: Omit<Urql.UseQueryArgs<GiveOrderByIdCdcQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GiveOrderByIdCdcQuery>({ query: GiveOrderByIdCdcDocument, ...options });
};
export const GiveOrdersDocument = gql`
    query GiveOrders {
  giveOrders {
    ...RegularGiveOrders
  }
}
    ${RegularGiveOrdersFragmentDoc}`;

export function useGiveOrdersQuery(options: Omit<Urql.UseQueryArgs<GiveOrdersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GiveOrdersQuery>({ query: GiveOrdersDocument, ...options });
};
export const GiveOrdersCdcDocument = gql`
    query GiveOrdersCdc {
  giveOrdersCdc {
    ...RegularGiveOrdersCdc
  }
}
    ${RegularGiveOrdersCdcFragmentDoc}`;

export function useGiveOrdersCdcQuery(options: Omit<Urql.UseQueryArgs<GiveOrdersCdcQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GiveOrdersCdcQuery>({ query: GiveOrdersCdcDocument, ...options });
};
export const GivesDocument = gql`
    query Gives {
  gives {
    ...RegularGive
  }
}
    ${RegularGiveFragmentDoc}`;

export function useGivesQuery(options: Omit<Urql.UseQueryArgs<GivesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GivesQuery>({ query: GivesDocument, ...options });
};
export const GivesCdcDocument = gql`
    query GivesCdc {
  givesCdc {
    ...RegularGiveCdc
  }
}
    ${RegularGiveCdcFragmentDoc}`;

export function useGivesCdcQuery(options: Omit<Urql.UseQueryArgs<GivesCdcQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GivesCdcQuery>({ query: GivesCdcDocument, ...options });
};
export const IssueByIdDocument = gql`
    query IssueById($id: Int!) {
  issueById(id: $id) {
    ...RegularSalesIssue
  }
}
    ${RegularSalesIssueFragmentDoc}`;

export function useIssueByIdQuery(options: Omit<Urql.UseQueryArgs<IssueByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IssueByIdQuery>({ query: IssueByIdDocument, ...options });
};
export const JobItByCreatorIdDocument = gql`
    query JobITByCreatorId {
  jobITByCreatorId {
    ...RegularJobIT
  }
}
    ${RegularJobItFragmentDoc}`;

export function useJobItByCreatorIdQuery(options: Omit<Urql.UseQueryArgs<JobItByCreatorIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<JobItByCreatorIdQuery>({ query: JobItByCreatorIdDocument, ...options });
};
export const JobItByIdDocument = gql`
    query JobITById($id: Int!) {
  jobITById(id: $id) {
    ...RegularJobIT
  }
}
    ${RegularJobItFragmentDoc}`;

export function useJobItByIdQuery(options: Omit<Urql.UseQueryArgs<JobItByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<JobItByIdQuery>({ query: JobItByIdDocument, ...options });
};
export const JobITsDocument = gql`
    query JobITs($input: QueryJobIT_Input!) {
  jobITs(input: $input) {
    ...RegularJobIT
  }
}
    ${RegularJobItFragmentDoc}`;

export function useJobITsQuery(options: Omit<Urql.UseQueryArgs<JobITsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<JobITsQuery>({ query: JobITsDocument, ...options });
};
export const LeavesDocument = gql`
    query Leaves($createBy: Boolean!) {
  leaves(createBy: $createBy) {
    ...RegularLeave
  }
}
    ${RegularLeaveFragmentDoc}`;

export function useLeavesQuery(options: Omit<Urql.UseQueryArgs<LeavesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LeavesQuery>({ query: LeavesDocument, ...options });
};
export const ManualAdByIdDocument = gql`
    query ManualADById($id: Int!) {
  manualADById(id: $id) {
    ...RegularManualAD
  }
}
    ${RegularManualAdFragmentDoc}`;

export function useManualAdByIdQuery(options: Omit<Urql.UseQueryArgs<ManualAdByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ManualAdByIdQuery>({ query: ManualAdByIdDocument, ...options });
};
export const ManualADsDocument = gql`
    query ManualADs {
  manualADs {
    ...RegularManualAD
  }
}
    ${RegularManualAdFragmentDoc}`;

export function useManualADsQuery(options: Omit<Urql.UseQueryArgs<ManualADsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ManualADsQuery>({ query: ManualADsDocument, ...options });
};
export const ProductByTiersDocument = gql`
    query ProductByTiers {
  ProductByTiers {
    id
    productName
    description
    category
    creatorName
    creatorId
    factorys {
      id
      companyName
      products {
        id
        productName
        description
        category
        creatorName
        creatorId
      }
    }
  }
}
    `;

export function useProductByTiersQuery(options: Omit<Urql.UseQueryArgs<ProductByTiersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductByTiersQuery>({ query: ProductByTiersDocument, ...options });
};
export const QueryProvincesDocument = gql`
    query QueryProvinces {
  queryProvinces {
    id
    name_th
  }
}
    `;

export function useQueryProvincesQuery(options: Omit<Urql.UseQueryArgs<QueryProvincesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QueryProvincesQuery>({ query: QueryProvincesDocument, ...options });
};
export const ResellByIdDocument = gql`
    query ResellById($id: Int!) {
  resellById(id: $id) {
    ...RegularResell
  }
}
    ${RegularResellFragmentDoc}`;

export function useResellByIdQuery(options: Omit<Urql.UseQueryArgs<ResellByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ResellByIdQuery>({ query: ResellByIdDocument, ...options });
};
export const ResellsDocument = gql`
    query Resells {
  resells {
    ...RegularResell
  }
}
    ${RegularResellFragmentDoc}`;

export function useResellsQuery(options: Omit<Urql.UseQueryArgs<ResellsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ResellsQuery>({ query: ResellsDocument, ...options });
};
export const ResellsByCreatorDocument = gql`
    query ResellsByCreator {
  resellsByCreator {
    ...RegularResell
  }
}
    ${RegularResellFragmentDoc}`;

export function useResellsByCreatorQuery(options: Omit<Urql.UseQueryArgs<ResellsByCreatorQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ResellsByCreatorQuery>({ query: ResellsByCreatorDocument, ...options });
};
export const SalesBrandsDocument = gql`
    query SalesBrands {
  salesBrands {
    id
    brand
  }
}
    `;

export function useSalesBrandsQuery(options: Omit<Urql.UseQueryArgs<SalesBrandsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SalesBrandsQuery>({ query: SalesBrandsDocument, ...options });
};
export const SalesRoleByIdDocument = gql`
    query SalesRoleById($id: Int!, $monthIndex: Int!) {
  salesRoleById(id: $id, monthIndex: $monthIndex) {
    id
    salesRole
    areaCode
    channel
    branch
    status
    userId
    targets {
      id
      year
      value
      branch
    }
    user {
      id
      fullNameTH
      imageUrl
    }
    issues {
      id
      saleRoleId
      saleName
      contact
      customer
      quotationNo
      brand
      category
      detail
      prob
      status
      value
      branch
      createdAt
      updatedAt
    }
    salesActual {
      id
      title
      detail
      actual
      branch
      customerId
      customer {
        id
        customerName
      }
      userId
      user {
        id
        fullNameTH
      }
      salesRoleId
      createdAt
      updatedAt
    }
  }
}
    `;

export function useSalesRoleByIdQuery(options: Omit<Urql.UseQueryArgs<SalesRoleByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SalesRoleByIdQuery>({ query: SalesRoleByIdDocument, ...options });
};
export const SalesRolesDocument = gql`
    query SalesRoles {
  salesRoles {
    id
    salesRole
    channel
    branch
    status
    userId
    user {
      id
      fullNameTH
      imageUrl
    }
  }
}
    `;

export function useSalesRolesQuery(options: Omit<Urql.UseQueryArgs<SalesRolesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SalesRolesQuery>({ query: SalesRolesDocument, ...options });
};
export const StockItByIdDocument = gql`
    query StockItById($id: Int!) {
  stockItById(id: $id) {
    ...RegularStockIt
  }
}
    ${RegularStockItFragmentDoc}`;

export function useStockItByIdQuery(options: Omit<Urql.UseQueryArgs<StockItByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StockItByIdQuery>({ query: StockItByIdDocument, ...options });
};
export const StockItsDocument = gql`
    query StockIts {
  stockIts {
    ...RegularStockIt
  }
}
    ${RegularStockItFragmentDoc}`;

export function useStockItsQuery(options: Omit<Urql.UseQueryArgs<StockItsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StockItsQuery>({ query: StockItsDocument, ...options });
};
export const UserAdminDocument = gql`
    query UserAdmin {
  userAdmin {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUserAdminQuery(options: Omit<Urql.UseQueryArgs<UserAdminQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserAdminQuery>({ query: UserAdminDocument, ...options });
};
export const UserByIdDocument = gql`
    query UserById($id: Int!) {
  userById(id: $id) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUserByIdQuery(options: Omit<Urql.UseQueryArgs<UserByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserByIdQuery>({ query: UserByIdDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};
export const FactoryByIdDocument = gql`
    query FactoryById($id: Int!) {
  factoryById(id: $id) {
    id
    industrialEstate
    businessType
    companyName
    description
    address
    phoneNumber
    FAX
    Email
    products {
      id
      productName
      description
      category
      creatorId
      creatorName
      createdAt
      updatedAt
      factorys {
        id
        industrialEstate
        businessType
        companyName
        description
        address
        phoneNumber
        FAX
        Email
      }
    }
    productReceives {
      id
      productName
      description
      category
      creatorName
      creatorId
      createdAt
      updatedAt
      factorys {
        id
        industrialEstate
        businessType
        companyName
        description
        address
        phoneNumber
        FAX
        Email
      }
    }
  }
}
    `;

export function useFactoryByIdQuery(options: Omit<Urql.UseQueryArgs<FactoryByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FactoryByIdQuery>({ query: FactoryByIdDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const StockItOrderByIdDocument = gql`
    query stockItOrderById($id: Int!) {
  stockItOrderById(id: $id) {
    ...RegularStockItOrder
  }
}
    ${RegularStockItOrderFragmentDoc}`;

export function useStockItOrderByIdQuery(options: Omit<Urql.UseQueryArgs<StockItOrderByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StockItOrderByIdQuery>({ query: StockItOrderByIdDocument, ...options });
};
export const StockItOrdersDocument = gql`
    query StockItOrders($createBy: Boolean!) {
  stockItOrders(createBy: $createBy) {
    ...RegularStockItOrder
  }
}
    ${RegularStockItOrderFragmentDoc}`;

export function useStockItOrdersQuery(options: Omit<Urql.UseQueryArgs<StockItOrdersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StockItOrdersQuery>({ query: StockItOrdersDocument, ...options });
};