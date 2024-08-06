import { FC } from 'react'

const DividerComponent: FC<{ label: string }> = ({ label }) => {
  return (
    <div className='dashed-divider'>{label}</div>
  )
}

export default DividerComponent