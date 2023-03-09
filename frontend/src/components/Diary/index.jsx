import React from "react";

const Diary = ({ diary,  showDiaryInfoModal }) => {
	return (
		diary && (
			<>
				<div
					
					onClick={(e) => {showDiaryInfoModal() ; e.stopPropagation()}} 
					className="flex flex-wrap items-end justify-between w-full transition duration-500 ease-in-out transform bg-black border-2 border-gray-600 rounded-lg hover:border-white mb-3"
				>
					<div className="w-full xl:w-1/4 md:w-1/4">
						<div className="relative flex flex-col h-full p-8 ">
							<h2 className="mb-4 font-semibold tracking-widest text-white uppercase title-font">
								{diary?.title}
							</h2>
							<h2 className="mb-4 font-semibold tracking-widest text-white title-font">
								{diary?.submitter_id}
							</h2>
							<h2 className="items-center mb-2 text-lg font-normal tracking-wide text-white">
								<span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-white rounded-full bg-blue-1300">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2.5"
										className="w-4 h-4"
										viewBox="0 0 24 24"
									>
										<path d="M20 6L9 17l-5-5"></path>
									</svg>
								</span>
								{diary?.selfcheck}
							</h2>
						</div>
					</div>
				</div>
			</>
		)
	);
};

export default Diary;
