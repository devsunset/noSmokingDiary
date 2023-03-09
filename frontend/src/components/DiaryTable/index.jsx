import Diary from "../Diary";
import React, {useState} from "react";
import PopupModal from "../Modal/PopupModal";
import FormInput from "../FormInput/FormInput";

const DiaryTable = ({diaries}) => {

  const [diaryInfoModal, setDiaryInfoModal] = useState(false)

    return (
      <>
        <div className="sections-list">
          {diaries.length && (
              diaries.map((diary) => (
                <Diary showDiaryInfoModal={() => setDiaryInfoModal(diary)} key={diary.id} diary={diary}  />
              ))
          )}
          {!diaries.length && (
              <p>No data</p>
          )}
        </div>
        {diaryInfoModal && <PopupModal
						modalTitle={"Diary Info"}
						onCloseBtnPress={() => {
							setDiaryInfoModal(false);
						}}
					>
						<div className="mt-4 text-left">
							<form className="mt-5">
								<FormInput
									disabled
									type={"text"}
									name={"title"}
									label={"Title"}
									value={diaryInfoModal?.title}
								/>
								<FormInput
									disabled
									type={"text"}
									name={"content"}
									label={"Content"}
									value={diaryInfoModal?.content}
								/>
								<FormInput
									disabled
									type={"text"}
									name={"writedate"}
									label={"Writedate"}
									value={diaryInfoModal?.writedate}
								/>
							</form>
						</div>
					</PopupModal>}
      </>
    )
}

export default DiaryTable;