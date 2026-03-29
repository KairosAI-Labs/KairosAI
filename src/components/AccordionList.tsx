import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { IconCode  } from '@tabler/icons-react';
import { type FAQType } from '../constants/FAQ';

interface AccordionListProps {
  FAQData: FAQType[]
}




export const AccordionList = ({FAQData}:AccordionListProps) => {
  return (
      <Accordion type="single" className='mt-5 max-w-[500px] overflow-y-auto overflow-hidden max-h-[300px] py-6 no-scrollbar' collapsible>
         {FAQData.map((itemfaq, id) => (
          <AccordionItem value={itemfaq.answer} key={id} className='border-none'>
            <AccordionTrigger className='flex items-center'>
              <i className='bg-white/15 p-1 rounded-full'>
                <IconCode className='' stroke={2} />
              </i>
              <span className='mr-auto'>{itemfaq.question}</span>  
            </AccordionTrigger>
            <AccordionContent >
              {itemfaq.answer}
            </AccordionContent>
          </AccordionItem>
          ))}
      </Accordion>
  )
}
