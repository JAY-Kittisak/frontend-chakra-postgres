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

export type FieldErrorManualAd = {
  __typename?: 'FieldErrorManualAD';
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

export type JoinTierInput = {
  productId: Scalars['Float'];
  factoryId: Scalars['Float'];
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
  createManualAD: ManualAdResponse;
  uploadPDFAd: ManualAdUrl;
  deleteManualAD: ManualAdResponse;
  createJobIT: JobIt_Response;
  updateJobIT: JobIt;
  jobITComment: JobIt;
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
  id: Scalars['Float'];
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

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
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
  giveOrderByCreatorId: Array<GiveOrder>;
  giveOrderByCreatorIdCdc: Array<GiveOrderCdc>;
  manualADs: Array<ManualAd>;
  manualADById: ManualAd;
  jobITs?: Maybe<Array<JobIt>>;
  jobITById: JobIt;
  jobITByCreatorId: Array<JobIt>;
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


export type QueryJobItByIdArgs = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  roles: Scalars['String'];
  departments: Scalars['String'];
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


export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  roles: Scalars['String'];
  fullNameTH?: Maybe<Scalars['String']>;
  fullNameEN?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  departments: Scalars['String'];
  giveOrders: Array<GiveOrder>;
  jobITs: Array<JobIt>;
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

export type RegularGiveFragment = (
  { __typename?: 'Give' }
  & Pick<Give, 'id' | 'giveName' | 'details' | 'price' | 'inventory' | 'category' | 'imageUrl' | 'createdAt' | 'updatedAt'>
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
  & Pick<JobIt, 'id' | 'titled' | 'desiredDate' | 'category' | 'status' | 'itComment' | 'itActionName' | 'creatorId' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'roles' | 'departments' | 'fullNameTH'>
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

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'roles' | 'departments' | 'fullNameTH' | 'fullNameEN' | 'nickName' | 'imageUrl' | 'createdAt' | 'updatedAt'>
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

export type GiveOrderByCreatorIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GiveOrderByCreatorIdQuery = (
  { __typename?: 'Query' }
  & { giveOrderByCreatorId: Array<(
    { __typename?: 'GiveOrder' }
    & RegularGiveOrdersFragment
  )> }
);

export type GiveOrderByCreatorIdCdcQueryVariables = Exact<{ [key: string]: never; }>;


export type GiveOrderByCreatorIdCdcQuery = (
  { __typename?: 'Query' }
  & { giveOrderByCreatorIdCdc: Array<(
    { __typename?: 'GiveOrderCdc' }
    & RegularGiveOrdersCdcFragment
  )> }
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

export type JobItByCreatorIdQueryVariables = Exact<{ [key: string]: never; }>;


export type JobItByCreatorIdQuery = (
  { __typename?: 'Query' }
  & { jobITByCreatorId: Array<(
    { __typename?: 'JobIT' }
    & RegularJobItFragment
  )> }
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

export type JobITsQueryVariables = Exact<{ [key: string]: never; }>;


export type JobITsQuery = (
  { __typename?: 'Query' }
  & { jobITs?: Maybe<Array<(
    { __typename?: 'JobIT' }
    & RegularJobItFragment
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
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  roles
  departments
  fullNameTH
  fullNameEN
  nickName
  imageUrl
  createdAt
  updatedAt
}
    `;
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
    query JobITs {
  jobITs {
    ...RegularJobIT
  }
}
    ${RegularJobItFragmentDoc}`;

export function useJobITsQuery(options: Omit<Urql.UseQueryArgs<JobITsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<JobITsQuery>({ query: JobITsDocument, ...options });
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