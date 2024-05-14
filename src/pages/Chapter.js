import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Select } from "antd";
import axios from "axios";
const Chapter = () => {
    const { id } = useParams()
    const { Option } = Select;
    const [chapters, setChapters] = useState()
    const [book, setBook] = useState()
    const [selectedChapter, setSelectedChapter] = useState(1);

    const handleChapterSelect = (chapterId) => {
        setSelectedChapter(chapterId);
    };
    const handleChapterChange = (step) => {
        const currentChapterIndex = chapters.findIndex((chapter) => chapter.chapter_id === selectedChapter);
        const newChapterIndex = currentChapterIndex + step;
        if (newChapterIndex >= 0 && newChapterIndex < chapters.length) {
            setSelectedChapter(chapters[newChapterIndex].chapter_id);
        }
    };

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/books/chapter/${id}`)
            .then(res => {
                setChapters(res.data.chapters)
                setBook(res.data.book_name)
                console.log(res.data.chapters);
            })
            .catch(error => console.log(error));
    }, []);
    return (
        <div className="py-[10px] px-[10%] max-w-[4/5]">
            <div className="flex flex-col justify-center items-center gap-4 mb-4">
                <h1 className="font-bold text-4xl text-red-400">{book}</h1>
                <div>
                    {selectedChapter && chapters && (
                        <div>
                            <h3 className="text-base text-gray-400">
                                Chương {selectedChapter} {selectedChapter && chapters.find((chapter) => chapter.chapter_id === selectedChapter)?.title || ''}
                            </h3>

                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center mb-3 gap-1">
                <button className=" h-8 flex justify-center items-center" onClick={() => handleChapterChange(-1)}>&lt;</button> {/* Nút tiến lùi */}
                <Select value={selectedChapter} onChange={handleChapterSelect}>
                    {chapters && chapters.map((chapter) => (
                        <Option key={chapter.chapter_id} value={chapter.chapter_id}>Chương {chapter.chapter_id}</Option>
                    ))}
                </Select>
                <button className=" h-8 flex justify-center items-center" onClick={() => handleChapterChange(1)}>&gt;</button> {/* Nút tiến tới */}
            </div>

            <div>
                {selectedChapter && chapters && (
                    <div>

                        <div className="text-lg font-sans" dangerouslySetInnerHTML={{ __html: chapters.find((chapter) => chapter.chapter_id === selectedChapter)?.description || '' }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Chapter
