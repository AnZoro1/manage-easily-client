import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import { RootState, useAppDispatch } from '../../../../features/store/store';
import { getObjectsReq } from '../../slice/ObjectsSlice';
import { useSelector } from 'react-redux';


const ListObjectCards: React.FC = () => {
    const [objectsList, setObjectList]: any[] = useState([])
    const dispatch = useAppDispatch()

    const getObjectsList = useSelector((state: RootState) => state.ObjectsSlice.object)

    useEffect(() => {
        dispatch(getObjectsReq())
    }, [])

    useEffect(() => {
        setObjectList(getObjectsList);
    }, [getObjectsList]);

    interface objectI {
        name: string,
        area: string,
        floors: string,
        address: string,
        isRented: boolean,
        rentalPrice: string,
        owner: string | null,
    }

    console.log(objectsList, 'objects');


    return (
        <List
            itemLayout="horizontal"
            dataSource={objectsList}
            renderItem={(item: objectI, index) => (
                <List.Item>
                    {/* <List.Item.Meta
                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    /> */}
                </List.Item>
            )}
        />)
};

export default ListObjectCards;