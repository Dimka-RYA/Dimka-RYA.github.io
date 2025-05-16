import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const CenterWrapperByAnima = (): JSX.Element => {
  // Review data for mapping
  const reviews = [
    {
      id: 1,
      name: "Вадим Романов",
      text: "Сделали все пиздато, буду брать еще, топчик компания",
      image: "/image-2-1.png",
      imagePosition: "left",
    },
    {
      id: 2,
      name: "Дмитрий Рябов",
      text: "ахуенно отпалировали очко, илюха топовый работник, на выходных заеду еще раз",
      image: "/image-3-1.png",
      imagePosition: "right",
    },
  ];

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-[1550px] mx-auto relative">
        <h2 className="text-4xl font-extrabold text-black text-center mb-12 [font-family:'Nunito',Helvetica]">
          ОТЗЫВЫ О КОМПАНИИ
        </h2>

        <div className="flex flex-wrap justify-center gap-8 relative">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="w-full md:w-[546px] h-auto relative border-[3px] border-[#87ceeb] rounded-[20px] overflow-hidden"
            >
              <CardContent className="p-0 h-full">
                <div className={`flex h-full flex-col ${review.imagePosition === "left" ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <img
                    className="w-full h-48 sm:w-[240px] sm:h-full object-cover"
                    alt="Customer"
                    src={review.image}
                  />
                  <div
                    className="flex-1 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-black text-lg sm:text-xl [font-family:'Nunito',Helvetica]">
                        {review.name}
                      </h3>
                      <p className="font-normal text-black text-xs sm:text-sm mt-2 [font-family:'Nunito',Helvetica] w-full">
                        {review.text}
                      </p>
                    </div>
                    <div className="flex mt-3">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          className="w-6 h-5 sm:w-7 sm:h-[26px] mr-1"
                          alt="Star"
                          src="/star-1.svg"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer hidden sm:block"
          aria-label="Previous review"
        >
          <img className="w-11 h-11" alt="Previous" src="/frame.svg" />
        </button>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer hidden sm:block"
          aria-label="Next review"
        >
          <img className="w-11 h-11" alt="Next" src="/frame-1.svg" />
        </button>
      </div>
    </section>
  );
};
