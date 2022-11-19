    import {useState} from 'react';

    export default function PrivatePage(props) {
    const [images, setImage] = useState([]);
    const [createObjectURL, setCreateObjectURL] = useState([]);
    const [desc, setDesc] = useState({
        title: '',
        desc: ''
    });

    const uploadToClient = (evt, index) => {
        if (evt.target.files && evt.target.files[0]) {
        const i = evt.target.files[0];

        images[index] = i;
        
        createObjectURL[index] = URL.createObjectURL(i);
        console.log(createObjectURL, 'after');
        setImage(images);
        setCreateObjectURL([...createObjectURL]);
        }
    };

    const uploadToServer = async (evt) => {
        for (const img of images) {
            const body = new FormData();
            body.append("file", img);
            const response = await fetch("/api/file", {
                 method: "POST",
                body
            });
        }

        await fetch('/api/description', {
            method: 'POST',
            body: setDesc
        });
    };

    const setDescription = evt => {
        desc[evt.target.name] = evt.target.value;

        setDesc({...desc});
    }


    return (
        <div>
        <div>
            <div>
                <input type="text" name="title" value={desc.title} onChange={setDescription} />
                <input type="text" name="desc" value={desc.desc} onChange={setDescription} />
            </div>
            <div>
                <img src={createObjectURL[0]} />
                <label htmlFor="img0">Zdjecie nr jeden</label>
                <input id="img0" type="file" name="img0" onChange={e => uploadToClient(e, 0)} />
            </div>
            <div>
                <img src={createObjectURL[1]} />
                <label htmlFor="img1">Zdjecie nr jeden</label>
                <input id="img1" type="file" name="img1" onChange={e => uploadToClient(e, 1)} />
            </div>
            <div>
                <img src={createObjectURL[2]} />
                <label htmlFor="img2">Zdjecie nr jeden</label>
                <input id="img2" type="file" name="img2" onChange={e => uploadToClient(e, 2)} />
            </div>
        </div>
        <button
            className=""
            type="submit"
            onClick={uploadToServer}
        >
        Send to server
        </button>
        </div>
    );
    }
