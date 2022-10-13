import React, { FC } from 'react';
import styles from './RecipeListItem.module.css';

interface Props {
    title: string;
    description: string;
    favorite?: boolean;
}

const RecipeListItem: FC<Props> = ({ title, description, favorite }) => {
    return (
        <div className={styles.container}>
            <header>
                <h3>{title}</h3>
                <div className={styles.btnWrapper}>
                    <button title="mark as favorite" className={favorite ? styles.filled : ''}></button>
                </div>
            </header>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    );
};

export default RecipeListItem;