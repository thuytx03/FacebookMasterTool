import { create } from 'zustand'
import { ProfileDataType } from '../types/auth'

type AuthState = {
    profile: ProfileDataType,
    fb_dtsg: string
}
type AuthAction = {
    saveProfileInfo: (profile: ProfileDataType) => void,
    setFB_DTSG: (fb_dtsg: string) => void
}
const useAuthStore = create<AuthState & AuthAction>((set) => ({
    profile: {} as ProfileDataType,
    fb_dtsg: '',
    setFB_DTSG: (fb_dtsg: string) => set({ fb_dtsg }),
    saveProfileInfo: (profile: ProfileDataType) => set({ profile })
}))
export default useAuthStore
