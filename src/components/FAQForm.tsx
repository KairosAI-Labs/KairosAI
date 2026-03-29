
import { useState, type ChangeEvent } from 'react';
import { ButtonGlass } from './ui/ButtonGlass';
import { IconSearch } from '@tabler/icons-react';
import { FAQ, FAQ_TYPES, MENU_FAQ_TYPES} from '../constants/FAQ';
import { cleanText } from '../lib/utils';
import clsx from 'clsx';
import { AccordionList } from './AccordionList';

type TOGGLE_FAQ_TYPE = FAQ_TYPES | "ALL"

export const FAQForm = () => {
  const [inputSearch, setInputSearch] = useState('')
  const [toggleFaqType, setToggleFaqType] = useState<TOGGLE_FAQ_TYPE>("ALL")


  const handleFaqType = (faqType:TOGGLE_FAQ_TYPE) =>  {
    setToggleFaqType(faqType)
  }

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value)
  }

  const filteredFaq = FAQ.filter((faq) => {
      const searchTarget = cleanText(faq.question)
      const searchTerm = cleanText(inputSearch)

      return toggleFaqType === "ALL" 
        ? searchTarget.includes(searchTerm)
        : searchTarget.includes(searchTerm) && faq.type == toggleFaqType
    })


  return (
    <section>
      <div className='flex gap-4 items-center my-10 justify-center flex-wrap'>
        <ButtonGlass 
          onClick={() => handleFaqType('ALL')} 
          type="button" 
          className={clsx(
              'text-sm',
              {
                'opacity-50': toggleFaqType !== "ALL"
              }
            )} 
          variant="icon">
           Todas
        </ButtonGlass>

        {
          MENU_FAQ_TYPES.map(menu => (
            <ButtonGlass 
              key={menu.name} 
              className={clsx(
                'text-sm',
                {
                  'opacity-50': toggleFaqType !== menu.type
                }
              )} 
              onClick={() => handleFaqType(menu.type)} type="button" variant="icon">
              {menu.name}
            </ButtonGlass>
          ))
        }

      </div>

      <form role="search">
        <div
          className="flex items-center gap-5 ring-1 ring-gray-500/50 rounded-[20px] py-2 px-4 w-[500px] max-[578px]:w-[90%] mx-auto"
        >
          <ButtonGlass type="button" variant="icon">
            <IconSearch stroke={2} className='text-white/75'  />
          </ButtonGlass>
          <input
            type="text"
            onChange={handleSearch}
            className="placeholder:text-white outline-0 w-full"
            placeholder="¿Y cuanto me va costar?...."
          />
        </div>
      </form>

      <AccordionList FAQData={filteredFaq} />
    </section>
  )
}
