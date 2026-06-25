import React from "react";
import Card from "../components/Ui/Card";


const OverviewCardInfo = [{
    title: "WorkSpaces",
    description: "Create your team space and organize projects in one place."
},
{
    title: "Projects",
    description: "Manage tasks, members and progress of your development"
},
{
    title: "Developers",
    description: "Collaborate with developers and build together"
},
]

const Overview = () => {
    return (
        <div className="mt-7 pt-12">
            <h1 className="text-white text-center text-5xl">What is Orbit?</h1>
            <div className="flex gap-4 justify-evenly items-center  py-20">
                {
                    OverviewCardInfo.map((info, id) => (
                        <Card key={id} title={info.title} description={info.description} />
                    ))
                }
            </div>
        </div>
    )
}


export default Overview