import Chip from 'components/Chip'
import { useValues } from 'kea'
import React, { useEffect, useState } from 'react'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { BasicHedgehogImage } from '../BasicHedgehogImage'
import { CallToAction } from '../CallToAction'
import Layout from '../Layout'
import Lottie from 'react-lottie'
import pizzaFight from '../../lotties/pizza-fight.json'

export default function NotFoundPage(): JSX.Element {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [submittedPreference, setSubmittedPreference] = useState(false)

    useEffect(() => {
        if (posthog) {
            // Allows us to identify which pages are triggering 404s
            posthog.capture('page_404')
        }
    }, [])

    const capturePineapplePreference = (userLikesPineappleOnPizzaAkaTheyreCorrect = false) => {
        setSubmittedPreference(true)
        if (posthog) {
            posthog.capture('pineapple_on_pizza_survey', {
                does_pineapple_go_on_pizza: userLikesPineappleOnPizzaAkaTheyreCorrect,
            })
        }
    }

    return (
        <Layout className="not-found-page-container">
            <div className="centered py-12">
                <div className="relative z-10">
                    <h2>Oops, there's nothing here</h2>

                    <p>
                        Think this is a mistake? Email <a href="mailto:hey@posthog.com">hey@posthog.com</a> and we'll
                        fix it!
                    </p>

                    <p>
                        <strong>But while you're here,</strong> we have an important question...
                    </p>

                    <h4>Does pineapple belong on pizza?</h4>

                    <div style={{ paddingBottom: 10 }}>
                        {submittedPreference ? (
                            <p>Thanks for letting us know!</p>
                        ) : (
                            <div className="flex justify-center space-x-2">
                                <Chip onClick={() => capturePineapplePreference(true)} text="Yes" />
                                <Chip onClick={() => capturePineapplePreference(false)} text="No" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="-mt-20 sm:-mt-32 max-w-2xl w-full mx-auto relative h-[378px]">
                    <span className="w-full h-[2px] bg-black absolute left-0 bottom-[20%] rounded-md" />
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: pizzaFight,
                        }}
                    />
                </div>
                <CallToAction type="primary" width="84" to="/">
                    Take me back to the homepage
                </CallToAction>
            </div>
        </Layout>
    )
}
