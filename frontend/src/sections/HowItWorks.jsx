const steps = [
  {
    number: "01",
    title: "Create Workspace",
    description: "Set up your team workspace."
  },
  {
    number: "02",
    title: "Create Project",
    description: "Add your project and define goals."
  },
  {
    number: "03",
    title: "Invite Members",
    description: "Collaborate with your team members."
  },
  {
    number: "04",
    title: "Build Together",
    description: "Track progress and ship amazing products."
  }
];


function HowItWorks() {
  return (
    <section className="bg-[#020817] mt-7 px-6 pb-4">

      <h2 className="text-white flex justify-center items-center text-5xl pb-20">
        How Orbit Works
      </h2>


      <div className="relative max-w-6xl mx-auto ">


        {/* horizontal line */}
        <div className="
          absolute 
          top-7
          left-14
          right-14
          h-0.5
          bg-purple-600/40
        ">
        </div>


        <div className="
          grid
          grid-cols-4
          gap-40
          relative
        ">


          {
            steps.map((step,index)=>(
              
              <div 
                key={index}
                className="text-center"
              >


                {/* Number Circle */}
                <div className="
                  relative
                  mx-auto
                  w-14
                  h-14
                  rounded-full
                  flex
                  items-center
                  justify-center
                  bg-purple-600
                  text-white
                  font-semibold
                  border-4
                  border-[#121c37]
                  shadow-lg
                ">
                  {step.number}
                </div>



                {/* Text */}
                <h3 className="
                  mt-8
                  text-lg
                  font-semibold
                  font-mono
                  text-white
                ">
                  {step.title}
                </h3>


                <p className="
                  mt-3
                  text-gray-400
                  max-w-50
                  mx-auto
                ">
                  {step.description}
                </p>


              </div>

            ))
          }


        </div>


      </div>

    </section>
  )
}


export default HowItWorks;