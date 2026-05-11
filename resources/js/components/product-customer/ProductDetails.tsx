import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types';

type ProductDetailsTabs = {
    ingredients: Product['ingredients'];
    description: Product['description'];
};

export function ProductDetails({
    ingredients,
    description,
}: ProductDetailsTabs) {
    const nutritionalFacts = [
        { nutrient: 'Calories', value: '320 kcal' },
        { nutrient: 'Protein', value: '12g' },
        { nutrient: 'Carbohydrates', value: '58g' },
        { nutrient: 'Dietary Fiber', value: '6g' },
        { nutrient: 'Total Fat', value: '4g' },
        { nutrient: 'Sodium', value: '480mg' },
        { nutrient: 'Iron', value: '15% DV' },
        { nutrient: 'Calcium', value: '8% DV' },
    ];

    const ingredientsDummy = ingredients ?? [
        'Rice (50%)',
        'Yellow Moong Dal (30%)',
        'Mixed Vegetables (Carrots, Peas, Beans)',
        'Turmeric Powder',
        'Cumin Seeds',
        'Ginger',
        'Green Chili',
        'Coriander Leaves',
        'Ghee',
        'Salt',
        'Asafoetida (Hing)',
    ];

    const preparationSteps = [
        'Empty the contents of the packet into a bowl',
        'Add 2 cups of water and mix well',
        'Microwave on high for 5-7 minutes or cook on stovetop',
        'Stir well and let it rest for 1 minute',
        'Add a dollop of ghee (optional) and serve hot',
    ];

    const whyChoose = [
        'Made with premium quality rice and lentils',
        'No artificial preservatives or colors',
        'Rich in protein and dietary fiber',
        'Perfect balance of traditional spices',
        'Convenient single-serve packaging',
        'Ideal for busy lifestyles',
    ];

    return (
        <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-2 lg:grid-cols-2">
                    <TabsTrigger value="description" className="py-3">
                        Deskripsi Makanan
                    </TabsTrigger>
                    <TabsTrigger value="ingredients" className="py-3">
                        Bahan Makanan
                    </TabsTrigger>
                    {/* <TabsTrigger value="nutrition" className="py-3">
                        Isi Makanan
                    </TabsTrigger> */}

                    {/*
                    <TabsTrigger value="preparation" className="py-3">
                        Preparation
                    </TabsTrigger> */}
                </TabsList>

                <TabsContent value="description" className="mt-6 space-y-6">
                    <div>
                        <h3 className="mb-3 text-gray-900">
                            About This Product
                        </h3>
                        <p className="leading-relaxed text-gray-700">
                            {description}
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="nutrition" className="mt-6">
                    <h3 className="mb-4 text-gray-900">
                        Nutritional Facts (Per Serving - 100g)
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-green-50">
                                <tr>
                                    <th className="p-4 text-left text-gray-900">
                                        Nutrient
                                    </th>
                                    <th className="p-4 text-right text-gray-900">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {nutritionalFacts.map((fact, index) => (
                                    <tr
                                        key={index}
                                        className={
                                            index % 2 === 0
                                                ? 'bg-white'
                                                : 'bg-gray-50'
                                        }
                                    >
                                        <td className="p-4 text-gray-700">
                                            {fact.nutrient}
                                        </td>
                                        <td
                                            className="p-4 text-right text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            {fact.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-[14px] text-gray-600">
                        * Percent Daily Values are based on a 2,000 calorie
                        diet. Your daily values may be higher or lower depending
                        on your calorie needs.
                    </p>
                </TabsContent>

                <TabsContent value="ingredients" className="mt-6">
                    <h3 className="mb-4 text-gray-900">Bahan Makanan</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {ingredientsDummy.map((ingredient, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3"
                            >
                                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                                <span className="text-gray-700">
                                    {ingredient}
                                </span>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="preparation" className="mt-6">
                    <h3 className="mb-4 text-gray-900">How to Prepare</h3>
                    <div className="space-y-4">
                        {preparationSteps.map((step, index) => (
                            <div key={index} className="flex gap-4">
                                <div
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white"
                                    style={{ fontWeight: 600 }}
                                >
                                    {index + 1}
                                </div>
                                <div className="flex-1 pt-2">
                                    <p className="text-gray-700">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                            <h4 className="mb-2 text-orange-900">
                                Microwave Method
                            </h4>
                            <p className="text-[14px] text-gray-700">
                                Cook on high for 5-7 minutes, stirring once
                                halfway through for best results.
                            </p>
                        </div>
                        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                            <h4 className="mb-2 text-orange-900">
                                Stovetop Method
                            </h4>
                            <p className="text-[14px] text-gray-700">
                                Simmer on medium heat for 8-10 minutes, stirring
                                occasionally until fully cooked.
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
