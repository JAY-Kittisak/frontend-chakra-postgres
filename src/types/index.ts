export type FactoryTab = "All" | FactoryIndustrialEstate
export type FactoryIndustrialEstate = "แก่งคอย" | "แหลมฉบัง"
export const factoryTab: FactoryTab[] = [
    "All",
    "แก่งคอย",
    "แหลมฉบัง"
]


// ไว้ใช้เวลา Create | add 
export type IndustrialEstateCategory = 'แก่งคอย' | 'แหลมฉบัง'
export const categories: IndustrialEstateCategory[] = ['แก่งคอย', 'แหลมฉบัง']