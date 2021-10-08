import { FactoryTab, FactoryIndustrialEstate } from "../types";

export const formatAmount = (amount: number) =>
    amount.toLocaleString("en", { minimumFractionDigits: 0 });
export const formatDate = (date: number) => new Date(date).toLocaleDateString();
export const formatUpperCase = (category: string) => category.toUpperCase();

type CatProductV1 = "อะไหล่รถยนต์" | "อาหาร" | "อิเล็กทรอนิกส์" | "*โปรดเลือก";

export const factoryTab: FactoryTab[] = [
    "All",
    "แก่งคอย",
    "แหลมฉบัง",
    "เหมราชอีสเทิร์นซีบอร์ด",
    "เอเซีย (สุวรรณภูมิ)",
    "เอเซีย",
    "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4",
];
export const catProduct: CatProductV1[] = [
    "*โปรดเลือก",
    "อะไหล่รถยนต์",
    "อาหาร",
    "อิเล็กทรอนิกส์",
];

// ไว้ใช้เวลา Create | add
export const categories: FactoryIndustrialEstate[] = [
    "แก่งคอย",
    "แหลมฉบัง",
    "เหมราชอีสเทิร์นซีบอร์ด",
    "เอเซีย (สุวรรณภูมิ)",
    "เอเซีย",
    "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4",
];

type CatUserRole = "ลาดกระบัง" | "ชลบุรี" | "*โปรดเลือกสาขา";
export const catUserRole: CatUserRole[] = [
    "*โปรดเลือกสาขา",
    "ลาดกระบัง",
    "ชลบุรี",
];

type CatDepartments =
    | "client"
    | "account"
    | "adminSale"
    | "delivery"
    | "engineer"
    | "inventory"
    | "Marketing"
    | "Purchasing"
    | "Quality"
    | "SaleCo"
    | "Sales"
    | "*โปรดเลือกแผนก";
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
    "Sales",
];

export const fileType = ["image/png", "image/jpeg", "image/ipg"];

// ---------------------- Give ----------------------
export type CategoryGive =
    | "USB"
    | "สมุด"
    | "ปากกา"
    | "เลือกกลุ่มสินค้า"
    | "พวงกุญแจ"
    | "เหล้า"
    | "ขนม";

// ---------------------- Status ----------------------
export type CategoryStatus = "New" | "Preparing" | "Success";
export const catStatus: CategoryStatus[] = ["New", "Preparing", "Success"];

// ---------------------- Job Status ----------------------
export type statusIt = "New" | "Wait Approve" | "Success" | "Impossible";
export const jobStatus: statusIt[] = [
    "New",
    "Wait Approve",
    "Success",
    "Impossible",
];
// ---------------------- สาขา ----------------------
export type Branch = "All" | "ลาดกระบัง" | "ชลบุรี";

// ---------------------- CategoryItemIt ----------------------
export type CategoryItemIt =
    | "Battery UPS"
    | "Keyboard"
    | "NoteBook"
    | "Router"
    | "Mouse"
    | "UPS"
    | "PC"
export const itemIt: CategoryItemIt[] = [
    "Battery UPS",
    "NoteBook",
    "Keyboard",
    "Router",
    "Mouse",
    "UPS",
    "PC",
];
// ---------------------- Brand stock IT ----------------------
export type BrandItemIt =
    | "MICROSOFT"
    | "HUAWEI"
    | "LENOVO"
    | "ACER"
    | "DELL"
    | "MSI"
    | "HP"
export const brandItemIt: BrandItemIt[] = [
    "MICROSOFT",
    "HUAWEI",
    "LENOVO",
    "ACER",
    "DELL",
    "MSI",
    "HP",
];
