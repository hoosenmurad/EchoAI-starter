import { PropsWithChildren } from 'react';

import { ChakraProvider, Flex, Link, Stack, Text } from '@chakra-ui/react';

import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

import SupabaseProvider from './supabase-provider';
import { Auth } from '@supabase/ui';
import { useSupabase } from './supabase-provider';

import '@/styles/main.css';

const meta = {
  title: 'Translation AI',
  description: 'Brought to you by Sync Labs',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  robots: meta.robots,
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description
  }
};

const bannerCopy = `Launching very soon, watch this space `;

const bannerLink = `https://github.com/hoosenmurad/EchoAI-starter`;

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  const { supabase } = useSupabase();
  return (
    <html lang="en">
      <body className="bg-black loading">
        <SupabaseProvider>
          <ChakraProvider>
            <Stack
              justifyContent="space-between"
              className="min-h-screen"
              gap={0}
            >
              <Flex direction="column" flex="1">
                <Flex
                  className="bg-red-400"
                  w="full"
                  p={2}
                  justifyContent={'center'}
                  fontSize="sm"
                >
                  <Text>
                    {bannerCopy}
                    <Link href={bannerLink} target="_blank" fontWeight="bold">
                      here
                    </Link>
                  </Text>
                </Flex>
                <Navbar />
                <Flex w="full" flex="1" justifyContent={'center'}>
                  <Flex w="full" maxW="6xl" flex="1">
                    <Auth
                      supabaseClient={supabase}
                      providers={['google', 'apple']}
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Footer />
            </Stack>
          </ChakraProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
