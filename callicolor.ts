namespace modules {
    /**
     * Callicolor LED Ring 12
     */
    //% fixedInstance whenUsed block="Callicolor led ring"
    export const CallicolorLedRing = new LedClient("callicolor led ring?dev=self&num_pixels=12&variant=ring")
}

namespace servers {
    function start() {
        jacdac.productIdentifier = 0x3a509251
        jacdac.deviceDescription = "Callicolor Calliope-LED"
        jacdac.startSelfServers(() => {
            const pin = DigitalPin.P0
            pins.setPull(pin, PinPullMode.PullNone)
            const sendPixels = (pixels: Buffer, brightness: number) => light.sendWS2812BufferWithBrightness(pixels, pin, brightness)
            const servers = [
                new jacdac.LedServer(
                    12,
                    jacdac.LedPixelLayout.RgbGrb,
                    sendPixels, {
                    variant: jacdac.LedVariant.Ring
                }),

            ]
            return servers
        })
    }
    start()
}