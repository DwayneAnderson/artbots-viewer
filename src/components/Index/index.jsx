import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const categories = [
  {
    label: 'FineArt',
    items: [
      { id: '976556889981906945', label: 'ArtBots' },
      { id: '1399409332341534720', label: 'TateCollection' },
      { id: '1399398488530509824', label: 'Womens Art' },
      { id: '1399764957877526531', label: 'MOMA' }
    ]
  },
  {
    label: 'Photography',
    items: [
      { id: '1399398252517093378', label: 'Mean Streets NYC' }
    ]
  },
  {
    label: 'Animation',
    items: [
      { id: '1394666258121957384', label: 'Bees & Bombs' }
    ]
  },
  {
    label: 'Animals',
    items: [
      { id: '1401613832733159424', label: 'Orangutans' },
      { id: '1401613291655352320', label: 'Capybara Country' }
    ]
  },
  {
    label: 'Science & Technology',
    items: [
      { id: '1399765585425170438', label: 'The Ephemerides (NASA OPUS)' },
      { id: '1401302645030023168', label: 'Among Stars' }
    ]
  },
  {
    label: 'Miscellaneous',
    items: [
      { id: '1399734600268611585', label: '70s SciFi Art' },
      { id: '1399407403800481792', label: 'xkcd' },
      { id: '1399419658206277633', label: 'Everything is Terrible' },
      { id: '1399398958137413639', label: 'NEOMECHANICA' },
      { id: '1401303961370464256', label: 'AutoCharts' },
      { id: '1401305614760833025', label: 'Old School Hip Hop Flyers' },
      { id: '1401610106094067713', label: 'SimpsonsScreens 97-98' },
      { id: '1401610747499532288', label: 'Homestar Runner Screens' },
      { id: '1401611907325255680', label: 'Atari 800 Screens' },
      { id: '1399398816034398208', label: 'Liana Finck' },
      { id: '1401616124484063232', label: 'Glitch 80' },
      { id: '1401617275623383040', label: 'FlashBak' }
    ]
  }
]

const Index = () => {
  return (
    <div className='Index'>
      <div className='Index__Header'>
        <h1>ArtBots Viewer</h1>
      </div>
      <div className='Index__List'>
        <ul>
          {categories.map(category => (
            <li key={category.label}>
              <h4>{category.label}</h4>
              <ul>
                {category.items.map(item => (
                  <li key={item.id}>
                    <Link to={`/list/${item.id}`}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Index
