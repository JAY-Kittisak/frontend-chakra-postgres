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

export type JoinTierInput = {
  productId: Scalars['Float'];
  factoryId: Scalars['Float'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  uploadImageMe?: Maybe<UserResponse>;
  updateRoles?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
  createFactory: Factory;
  createProductByTier: ProductByTier;
  joinFactory: Scalars['Boolean'];
  deleteProduct: Scalars['Boolean'];
  addProfilePicture: Scalars['Boolean'];
  imageUploader?: Maybe<Scalars['String']>;
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


export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload'];
};


export type MutationImageUploaderArgs = {
  imageMe: Scalars['Upload'];
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

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  roles: Scalars['String'];
  departments: Scalars['String'];
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'roles' | 'departments' | 'fullNameTH' | 'fullNameEN' | 'nickName' | 'imageUrl' | 'createdAt' | 'updatedAt'>
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

export type UploadImageMeMutationVariables = Exact<{
  options: Scalars['Upload'];
}>;


export type UploadImageMeMutation = (
  { __typename?: 'Mutation' }
  & {
    uploadImageMe?: Maybe<(
      { __typename?: 'UserResponse' }
      & {
        errors?: Maybe<Array<(
          { __typename?: 'FieldError' }
          & Pick<FieldError, 'field' | 'message'>
        )>>, user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'imageUrl'>
        )>
      }
    )>
  }
);

export type FactoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FactoriesQuery = (
  { __typename?: 'Query' }
  & { factories: Array<(
    { __typename?: 'Factory' }
    & Pick<Factory, 'id' | 'industrialEstate' | 'businessType' | 'companyName' | 'description' | 'address' | 'phoneNumber' | 'FAX' | 'Email'>
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
export const UploadImageMeDocument = gql`
    mutation UploadImageMe($options: Upload!) {
  uploadImageMe(options: $options) {
    errors {
      field
      message
    }
    user {
      imageUrl
    }
  }
}
    `;

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