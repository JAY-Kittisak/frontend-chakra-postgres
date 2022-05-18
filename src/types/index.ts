import { RegularSalesVisitFragment } from "../generated/graphql"

export type FactoryTab = "All" | FactoryIndustrialEstate
export type FactoryIndustrialEstate = "แก่งคอย" | "แหลมฉบัง" | "เหมราชอีสเทิร์นซีบอร์ด" | "เอเซีย (สุวรรณภูมิ)" | "เอเซีย" | "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4"

// ไว้ใช้เวลา Create | add 
export const categories: FactoryIndustrialEstate[] = ['แก่งคอย', 'แหลมฉบัง']

export type CatProduct = "อะไหล่รถยนต์" | "อาหาร" | "อิเล็กทรอนิกส์"

// Chart Sales Report
export type RoleJsr =
    | 'Sales01'
    | 'Sales02'
    | 'Sales03'
    | 'Sales04'
    | 'Sales05'
    | 'Sales06'
    | 'Sales07'
    | 'Sales08'
    | 'Sales09'
    | 'Sales10'
    | 'Sales11'
    | 'Sales12'
    | 'Sales13'
    | 'Sales14'
    | 'Sales15'
    | 'Sales16'
    | 'Sales17'

export type RoleCdc =
    | 'sale_cda01'
    | 'sale_cda02'
    | 'sale_cda03'
    | 'sale_cda04'
    | 'sale_cda05'
    | 'sale_cda06'
    | 'sale_cda08'
    | 'sale_cda09'
    | 'sale_cda10'
    | 'sale_cda11'
    | 'sale_cda12'
    | 'sale_cda14'
    | 'sale_cda15'
    | 'sale_cda16'
    | 'sale_cdc00'
    | 'sale_cdc02'
    | 'sale_cdc03'
    | 'sale_cdc04'
    | 'sale_cdc05'
    | 'sale_cdc06'
    | 'sale_cdc07'
    | 'sale_cdc08'
    | 'sale_cdc09'
    | 'sale_cdc10'

export type FilterRoleJsr = { [key in RoleJsr]: RegularSalesVisitFragment[] }

export type ThisMonth = {
    date: number,
    result: boolean
}
export type RoleThisMonth = {
    role: RoleJsr | RoleCdc
    thisMonth: ThisMonth[]
}