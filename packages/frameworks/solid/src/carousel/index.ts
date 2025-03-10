import { Carousel as CarouselRoot, type CarouselProps } from './carousel'
import { useCarouselContext, type CarouselContext } from './carousel-context'
import { CarouselControl, type CarouselControlProps } from './carousel-control'
import { CarouselIndicator, type CarouselIndicatorProps } from './carousel-indicator'
import {
  CarouselIndicatorGroup,
  type CarouselIndicatorGroupProps,
} from './carousel-indicator-group'
import { CarouselNextTrigger, type CarouselNextTriggerProps } from './carousel-next-trigger'
import { CarouselPrevTrigger, type CarouselPrevTriggerProps } from './carousel-prev-trigger'
import { CarouselItem, type CarouselItemProps } from './carousel-slide'
import { CarouselItemGroup, type CarouselItemGroupProps } from './carousel-slide-group'
import { CarouselViewport, type CarouselViewportProps } from './carousel-viewport'

const Carousel = Object.assign(CarouselRoot, {
  Root: CarouselRoot,
  Control: CarouselControl,
  Indicator: CarouselIndicator,
  IndicatorGroup: CarouselIndicatorGroup,
  NextTrigger: CarouselNextTrigger,
  PrevTrigger: CarouselPrevTrigger,
  Item: CarouselItem,
  ItemGroup: CarouselItemGroup,
  Viewport: CarouselViewport,
})

export {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselViewport,
  useCarouselContext,
}
export type {
  CarouselContext,
  CarouselControlProps,
  CarouselIndicatorGroupProps,
  CarouselIndicatorProps,
  CarouselItemGroupProps,
  CarouselItemProps,
  CarouselNextTriggerProps,
  CarouselPrevTriggerProps,
  CarouselProps,
  CarouselViewportProps,
}
