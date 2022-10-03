function DonorProfile() {

    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    return (
    <>
        <div>DONOR PROFILE PAGE</div>
    </>
    )
}

export default DonorProfile