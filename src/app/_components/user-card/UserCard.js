import React from 'react'
import styles from './UserCard.module.css'

export default function UserCard({user}) {
  return (
    <div className={styles['card']}>
      <h6>{user._id}</h6>
      <h3>{user.name}</h3>
    </div>
  )
}