import { FactoryTab, FactoryIndustrialEstate } from "../types"
type CatProductV1 = "อะไหล่รถยนต์" | "อาหาร" | "อิเล็กทรอนิกส์" | "*โปรดเลือก"
export const factoryTab: FactoryTab[] = [
    "All",
    "แก่งคอย",
    "แหลมฉบัง",
    "เหมราชอีสเทิร์นซีบอร์ด",
    "เอเซีย (สุวรรณภูมิ)",
    "เอเซีย",
    "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4",
]
export const catProduct: CatProductV1[] = [
    "*โปรดเลือก",
    "อะไหล่รถยนต์",
    "อาหาร",
    "อิเล็กทรอนิกส์"
]

// ไว้ใช้เวลา Create | add 
export const categories: FactoryIndustrialEstate[] = [
    "แก่งคอย",
    "แหลมฉบัง",
    "เหมราชอีสเทิร์นซีบอร์ด",
    "เอเซีย (สุวรรณภูมิ)",
    "เอเซีย",
    "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4",
]
