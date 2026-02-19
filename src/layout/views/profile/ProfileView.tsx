import { ProfileForm } from "@/components/profile/ProfileForm"
import { ErrorUi } from "@/components/UI/ErrorUi"
import { Loader } from "@/components/UI/Loader"
import { useAuth } from "@/hooks/useAuth"


export const ProfileView = () => {
    const { data, isLoading, } = useAuth()


    if(isLoading) return <Loader/>
  if(!data) return  <ErrorUi message="No se encontro el usuario" />

  return (
    <ProfileForm data={data} />
  )
}
