import { useState, type ChangeEvent } from "react";
import Modal from "../Modal/Modal";
import classes from './PostModal.module.css';

export default function PostCreateModal({ channelName }: { channelName?: string }) {

    const [modal, setModal] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [content, setContent] = useState<string>('');

    function changeContent(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
    }

    function showModal() {
        setModal(!modal);
    }

    async function send(img: string | null) {
        if (content === '') return;

        await fetch(`http://localhost:5000/profile/post`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                content: content,
                image: img,
                channelName: channelName ?? ''
            })
        });
    }

    async function createPost() {
        let img: string | null = null;

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                img = reader.result as string;
                send(img);
            };
            reader.readAsDataURL(file);
            return;
        }

        send(null);
    }

    return (
        <div className={classes.main}>
            <button onClick={showModal} className={classes.showModal}>Create Post</button>

            <Modal open={modal} onClick={() => setModal(false)}>
                <div className={classes.textarea}>
                    <input type="file" onChange={(e) => {
                        if (e.target.files?.length) setFile(e.target.files[0]);
                    }} />
                    <textarea
                        className={classes.input}
                        onChange={changeContent}
                        value={content}
                        placeholder="What's happening?"
                    />
                </div>

                <div className={classes.div}>
                    <button className={classes.button} onClick={createPost}>Post</button>
                </div>
            </Modal>
        </div>
    );
}
