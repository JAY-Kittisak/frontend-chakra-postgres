import { FactoryTab, FactoryIndustrialEstate } from "../types"

export const formatAmount = (amount: number) => amount.toLocaleString('en', { minimumFractionDigits: 0 })

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

type CatUserRole = "ลาดกระบัง" | "ชลบุรี" | "*โปรดเลือกสาขา"
export const catUserRole: CatUserRole[] = [
    "*โปรดเลือกสาขา",
    "ลาดกระบัง",
    "ชลบุรี",
]

type CatDepartments = "client" |
    "account" |
    "adminSale" |
    "delivery" |
    "engineer" |
    "inventory" |
    "Marketing" |
    "Purchasing" |
    "Quality" |
    "SaleCo" |
    "Sales" |
    "*โปรดเลือกแผนก"
export const catDepartments: CatDepartments[] = [
    "*โปรดเลือกแผนก",
    "client",
    "account",
    "adminSale",
    "delivery",
    "engineer",
    "inventory",
    "Marketing",
    "Purchasing",
    "Quality",
    "SaleCo",
    "Sales"
]
