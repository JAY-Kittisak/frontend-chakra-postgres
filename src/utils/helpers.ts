import { FactoryTab, FactoryIndustrialEstate, FilterRoleJsr } from "../types";

export const formatAmount = (amount: number) =>
    amount.toLocaleString("en", { minimumFractionDigits: 0 });
export const formatDate = (date: number) => new Date(date).toLocaleDateString();
export const formatGetMonth = (date: number) => new Date(date).getMonth();
export const formatGetYear = (date: number) => new Date(date).getFullYear();
export const formatUpperCase = (category: string) => category.toUpperCase();
export const reducer = (previousValue: number, currentValue: number) =>
    previousValue + currentValue;

export const formatDateNew = (value: number) => {
    const date = new Date(value)
    const dd = date.getDate()
    const mm = date.getMonth()
    const yy = date.getFullYear()
    return `${dd} ${selectMonth[mm + 1]} ${yy}`;
}

export const serviceLife = (dateStart: string) => {
    const today = new Date();
    const getDateStart = new Date(dateStart);
    const differenceInTime = today.getTime() - getDateStart.getTime();
    const sumDateAll = differenceInTime / (1000 * 3600 * 24);
    const sumYear = sumDateAll / 365;
    const dateDifference = new Date(differenceInTime);
    const dayDiff = dateDifference.getUTCDate();
    const monthDiff = dateDifference.getUTCMonth();

    let resultYear = ''
    let resultMonth = ''

    if (sumYear >= 1) resultYear = sumYear.toString().split(".")[0] + " ปี "
    if (monthDiff >= 1) resultMonth = monthDiff + " เดือน " + dayDiff + ' วัน'

    const response = resultYear + resultMonth
    
    return response
}


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

type SelectMonth = "เดือน" |
    "มกราคม" |
    "กุมภาพันธ์" |
    "มีนาคม" |
    "เมษายน" |
    "พฤษภาคม" |
    "มิถุนายน" |
    "กรกฎาคม" |
    "สิงหาคม" |
    "กันยายน" |
    "ตุลาคม" |
    "พฤศจิกายน" |
    "ธันวาคม"

export const selectMonth: SelectMonth[] = [
    "เดือน",
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
]

export type DemoChannel = "Cutting 1" | "Cutting 2" | "Area" | "Region" | "Project"
export const salesChannel: Array<DemoChannel> = [
    "Cutting 1",
    "Cutting 2",
    "Area",
    "Region",
    "Project",
]
export type DemoSalesRole = "Sales01" | "Sales02" | "Sales03" | "Sales04" | "Sales05" | "Sales06"
export type DemoData = {
    id: number;
    title: string;
    createdAt: number;
    value: number;
    branch: CatUserRole;
    channel: DemoChannel;
    salesRole: DemoSalesRole;
}[]

export const demoData: DemoData | undefined = [
    {
        id: 1,
        title: "title 1",
        createdAt: new Date(2022, 0, 5).getTime(),
        value: 1000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 2,
        title: "title 2",
        createdAt: new Date(2022, 1, 5).getTime(),
        value: 2000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 3,
        title: "title 3",
        createdAt: new Date(2022, 2, 5).getTime(),
        value: 3000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 4,
        title: "title 4",
        createdAt: new Date(2022, 3, 5).getTime(),
        value: 4000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 5,
        title: "title 5",
        createdAt: new Date(2022, 4, 5).getTime(),
        value: 5000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 6,
        title: "title 6",
        createdAt: new Date(2022, 5, 5).getTime(),
        value: 5500,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 7,
        title: "title 7",
        createdAt: new Date(2023, 0, 5).getTime(),
        value: 7007,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 8,
        title: "title 8",
        createdAt: new Date(2023, 1, 5).getTime(),
        value: 6008,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 9,
        title: "title 9",
        createdAt: new Date(2023, 2, 5).getTime(),
        value: 5009,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 10,
        title: "title 10",
        createdAt: new Date(2023, 3, 5).getTime(),
        value: 3010,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 11,
        title: "title 11",
        createdAt: new Date(2023, 4, 5).getTime(),
        value: 7007,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 12,
        title: "title 12",
        createdAt: new Date(2023, 5, 5).getTime(),
        value: 6012,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 13,
        title: "title 13",
        createdAt: new Date(2022, 6, 5).getTime(),
        value: 1000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 14,
        title: "title 14",
        createdAt: new Date(2022, 7, 5).getTime(),
        value: 2000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 15,
        title: "title 15",
        createdAt: new Date(2022, 8, 5).getTime(),
        value: 3000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 16,
        title: "title 16",
        createdAt: new Date(2022, 9, 5).getTime(),
        value: 4000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 17,
        title: "title 17",
        createdAt: new Date(2022, 10, 5).getTime(),
        value: 5000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
    {
        id: 18,
        title: "title 18",
        createdAt: new Date(2022, 11, 5).getTime(),
        value: 6000,
        branch: "ลาดกระบัง",
        channel: "Cutting 1",
        salesRole: "Sales01"
    },
];

export const probSelect = [
    "น้อยกว่า 30%",
    "มากกว่า 30%",
    "มากกว่า 50%",
    "มากกว่า 90%",
];

export const catIssueStatus = ["Proposed", "Quoted", "Purchased", "Issued"];

// Chart Sales Report
export const initialRoleJsr: FilterRoleJsr = {
    Sales01: [],
    Sales02: [],
    Sales03: [],
    Sales04: [],
    Sales05: [],
    Sales06: [],
    Sales07: [],
    Sales08: [],
    Sales09: [],
    Sales10: [],
    Sales11: [],
    Sales12: [],
    Sales13: [],
    Sales14: [],
    Sales15: [],
    Sales16: [],
    Sales17: [],
}

export const initialRoleCdc = {
    salecda01: [],
    salecda02: [],
    salecda03: [],
    salecda04: [],
    salecda05: [],
    salecda06: [],
    salecda08: [],
    salecda09: [],
    salecda10: [],
    salecda11: [],
    salecda12: [],
    salecda14: [],
    salecda15: [],
    salecda16: [],
    salecdc00: [],
    salecdc02: [],
    salecdc03: [],
    salecdc04: [],
    salecdc05: [],
    salecdc06: [],
    salecdc07: [],
    salecdc08: [],
    salecdc09: [],
    salecdc10: [],
}
