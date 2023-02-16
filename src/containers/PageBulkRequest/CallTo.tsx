import React, { FC } from "react";

interface CallToProps {
   email: string,
   children: React.ReactNode
}

const CallTo: FC<CallToProps> = ({ email, children }) => (
    <a href={`mailto:${email}?subject=B2B Offering Bulk Requests`}>{children}</a>
)
   
export default CallTo