import React, { FC } from "react";

interface CallToProps {
   phone: string,
   children: React.ReactNode
}

const CallTo: FC<CallToProps> = ({ phone, children }) => (
    <a href={`tel:${phone}`}>{children}</a>
)
   
export default CallTo