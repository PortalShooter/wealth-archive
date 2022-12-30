import React from 'react';
import { getSanityData } from "@/shared/utils/sanity.utils";
import Partnerships from "@/pages/Partnerships/Partnerships";

export const getStaticProps = async () => {
    const partnershipsSlug = 'svdelos'

    const partnerships = await getSanityData(
        '',
        `*[_type=="partnerships" && slug.partnershipsSlug == ${partnershipsSlug}]`
    );

    return {
        props: {
            page: {
                menuItemUnderline: null
            },
            partnerships,
            layout: { header: null }
        },
    }
}

export function PartnershipsPage({ partnerships }) {
    return <Partnerships data={partnerships} />
}

export default PartnershipsPage;
