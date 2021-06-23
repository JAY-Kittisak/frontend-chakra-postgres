export type FactoryTab = "All" | FactoryIndustrialEstate
export type FactoryIndustrialEstate = "แก่งคอย" | "แหลมฉบัง" | "เหมราชอีสเทิร์นซีบอร์ด" | "เอเซีย (สุวรรณภูมิ)" | "เอเซีย" | "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4"
export const factoryTab: FactoryTab[] = [
    "All",
    "แก่งคอย",
    "แหลมฉบัง",
    "เหมราชอีสเทิร์นซีบอร์ด",
    "เอเซีย (สุวรรณภูมิ)",
    "เอเซีย",
    "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4",
]


// ไว้ใช้เวลา Create | add 
export type IndustrialEstateCategory = 'แก่งคอย' | 'แหลมฉบัง'
export const categories: IndustrialEstateCategory[] = ['แก่งคอย', 'แหลมฉบัง']