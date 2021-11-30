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

export type CatUserRole = "ลาดกระบัง" | "ชลบุรี";
export const catUserRole: CatUserRole[] = [
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
    | "Sales";
export const catDepartments: CatDepartments[] = [
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
export const selectBranch: Branch[] = [
    "All",
    "ลาดกระบัง",
    "ชลบุรี",
]
// ---------------------- CategoryItemIt ----------------------
export type CategoryItemIt =
    | "Battery UPS"
    | "Keyboard"
    | "Software"
    | "NoteBook"
    | "Router"
    | "Mouse"
    | "UPS"
    | "USB"
    | "PC"
    | "อื่นๆ"
export const itemIt: CategoryItemIt[] = [
    "Battery UPS",
    "NoteBook",
    "Software",
    "Keyboard",
    "Router",
    "Mouse",
    "UPS",
    "USB",
    "PC",
    "อื่นๆ"
];
// ---------------------- Brand stock IT ----------------------
export type BrandItem =
    | "MICROSOFT"
    | "LOGITECH"
    | "HUAWEI"
    | "LENOVO"
    | "ASUS"
    | "ACER"
    | "DELL"
    | "MSI"
    | "HP"
    | "อื่นๆ"
export const brandItemIt: BrandItem[] = [
    "MICROSOFT",
    "LOGITECH",
    "HUAWEI",
    "LENOVO",
    "ASUS",
    "ACER",
    "DELL",
    "MSI",
    "HP",
    "อื่นๆ",
];
// ---------------------- location ----------------------
export type LocationIt =
    | "Stock IT"
    | "หน้าห้องผู้บริหาร"
    | "ชั้น 4"
export const locationStock: LocationIt[] = [
    "Stock IT",
    "หน้าห้องผู้บริหาร",
    "ชั้น 4",
];
// ---------------------- Warranty ----------------------
export type Warranty =
    | "ประกัน 1 ปี"
    | "ประกัน 2 ปี"
    | "ประกัน 3 ปี"
    | "ประกัน 5 ปี"
    | "ประกัน LT."
export const warrantyIt: Warranty[] = [
    "ประกัน 1 ปี",
    "ประกัน 2 ปี",
    "ประกัน 3 ปี",
    "ประกัน 5 ปี",
    "ประกัน LT."
];
// ---------------------- Hold Status ----------------------
export type Hold =
    | "เบิก"
    | "ยืม"
    | "คืน"
export const holdItem: Hold[] = [
    "เบิก",
    "ยืม",
    "คืน"
];
// ---------------------- Current Status ----------------------
export type Current =
    | "ว่าง"
    | "ใช้งาน"
    | "เลิกใช้แล้ว"
export const crStatus: Current[] = [
    "ว่าง",
    "ใช้งาน",
    "เลิกใช้แล้ว"
];

export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}
export type LeaveType =
    | "ลากิจ"
    | "ลาป่วย"
    | "ลาคลอดบุตร"
    | "ลาอุปสมบทหรือลาประกอบพิธีฮัจย์"
    | "ลาอื่นๆ"
export const catLeave: LeaveType[] = [
    "ลากิจ",
    "ลาป่วย",
    "ลาคลอดบุตร",
    "ลาอุปสมบทหรือลาประกอบพิธีฮัจย์",
    "ลาอื่นๆ",
];

export type Approve = "รออนุมัติ" | "อนุมัติแล้ว" | "ไม่อนุมัติ"
export const catApprove: Approve[] = [
    "รออนุมัติ",
    "อนุมัติแล้ว",
    "ไม่อนุมัติ"
]

export type TypeDemoData = {
    id: number;
    customerCode: string;
    customerName: string;
    isDone: boolean
}

export type AlertNt = "show" | "hide"

type SelectMonth = "เดือนทั้งหมด" |
    "มกราคม" |
    "กุมภาพันธ์" |
    "มีนาคม" |
    "เมษายน" |
    "พฤษภาคม" |
    "มิถุนายน" |
    "กรกฏาคม" |
    "สิงหาคม" |
    "กันยายน" |
    "ตุลาคม" |
    "พฤศจิกายน" |
    "ธันวาคม"

export const selectMonth: SelectMonth[] = [
    "เดือนทั้งหมด",
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฏาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
]



