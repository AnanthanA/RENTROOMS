export interface UserInfoModel {
    id?: number | null;
    emailId: string | null;
    password: string | null;
    mobileNumber: string | null;
    type: string | null;
    sellerName: string | null;
    hotelName: string | null;
    hotelImageUrl: string | null | ArrayBuffer;
    hotelAddress: string | null;
}