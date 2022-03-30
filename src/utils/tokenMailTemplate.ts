export function tokenMailTemplate (token:any){
    return (
        `
        <div style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
            <div style="background-color:#6654F0; height:50px; color:#EFF6F2; font-size: 30px;text-align: center;padding-top: 14px">
                SKUPAL
            </div>
            <div style="padding-top: 50px; line-height: 25px;padding-bottom: 40px;padding-left: 14px;padding-right: 30px;font-size: 14px;">
                Dear Skupal User <br>
                Verification code:
                <h1>${token}</h1>

                <div>
                    This code remains valid for only 30 minutes. Please do not disclose to anyone
                </div>
            </div>
            <hr>
            <div style="text-align:center; padding-left: 100px;padding-right: 100px; font-size: 12px;">
                Join skupal to enjoy the best freelancing experience
            </div>
        </div>
        `
    )
}