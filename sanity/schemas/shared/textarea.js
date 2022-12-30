import React, {forwardRef} from "react";

import {PatchEvent, set} from 'part:@sanity/form-builder/patch-event';
import {FormField} from '@sanity/base/components';

import {TextArea as SanityTextArea} from '@sanity/ui'


const TextArea = forwardRef((props, ref) => {
  const {type, onChange, markers, presence, onFocus, onBlur} = props
  return (
    <FormField
      title={type.title}
      description={type.description}
      __unstable_markers={markers}
      __unstable_presence={presence}
    >
      <SanityTextArea placeholder={type.placeholder}
                      onChange={event => {
                        onChange(PatchEvent.from(set(event.target.value)))
                      }}
                      value={props.value}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      ref={ref}
      />
    </FormField>
  )
})

export default {
  title: 'Textarea',
  name: 'textarea',
  type: 'string',
  inputComponent: TextArea,
}
