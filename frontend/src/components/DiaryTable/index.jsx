import Diary from "../Diary";
import React, {useState} from "react";
import PopupModal from "../Modal/PopupModal";
import FormInput from "../FormInput/FormInput";
import FormTextarea from "../FormTextarea/FormTextarea";
import FormSelectBox from "../FormSelectBox/FormSelectBox";

const DiaryTable = ({diaries}) => {

  const [diaryInfoModal, setDiaryInfoModal] = useState(false)

    return (
      <>
        <div className="sections-list">
          {diaries.length > 0 && (
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
								<FormTextarea
									disabled
									type={"text"}
									name={"content"}
									label={"Content"}
									value={diaryInfoModal?.content}
								/>
								<FormSelectBox
									disabled
									name={"selfcheck"}
									label={"Selfcheck"}
									value={diaryInfoModal?.selfcheck}
								/>
							</form>
						</div>
					</PopupModal>}
      </>
    )
}

export default DiaryTable;